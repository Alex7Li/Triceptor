import * as PIXI from 'pixi.js'
import React from 'react';
import PropTypes from 'prop-types';
import {boardSize} from './constants.js';
import {Pusher} from './pusher.js';

const triHeight = 60.0;
const triWidth = 2.0 * triHeight / Math.sqrt(3);
const xOffset = 30.0;
const yOffset = 30.0;
const colorChange = 0x111141;

/* The selected triangle */
let selected = null;

// Graphic data for a cell
class Triangle {
    constructor(xLoc, yLoc, flipped, app, cell, props) {
        this.tri = new PIXI.Graphics();
        this.cell = cell;
        this.app = app;
        this.tri.x = xLoc;
        this.tri.y = yLoc;
        this.props = props;
        this.flipped = flipped;
        this.height = triHeight;
        this.color = 0x000000;
        if (this.cell.team === 1) {
            this.color = 0x326ada
        } else if (this.cell.team === 2) {
            this.color = 0xee4040
        } else if (this.cell.team === 3) {
            this.color = 0x05a05a
        } else if (this.cell.team === 4) {
            this.color = 0x754577
        }
        this.click = this.click.bind(this);
        this.select = this.select.bind(this);
        this.unselect = this.unselect.bind(this);
        this.addUnit = this.addUnit.bind(this);
        this.removeUnit = this.removeUnit.bind(this);
        this.registerMovement = this.registerMovement.bind(this);
        this.tri.on("pointertap", this.click);
        this.tri.interactive = true;
        this.tri.buttonMode = true;
        this.app.stage.addChild(this.tri);
    }

    addUnit(/* Unit */ unit) {
        this.unit = unit;
    }

    removeUnit() {
        this.app.stage.removeChild(this.sprite);
        this.unit = null;
    }

    registerMovement(unit){
        this.addUnit(unit);
        selected.removeUnit();
        this.unselect();
    }

    select() {
        if (selected) {
            this.unselect();
        }
        selected = this;
        this.color += colorChange;
    }

    unselect() {
        selected.color -= colorChange;
        selected = null;
    }

    click() {
        if (!selected) {
            if (this.unit) {
                this.select();
            }
        } else {
            const /* {!Array<Cell>} */ changedCells = selected.unit.move(this.cell, this.props);
            if (changedCells) {
                this.registerMovement(selected.unit)
            } else {
                if (this.unit) {
                    this.select();
                } else {
                    this.unselect();
                }
            }
        }
        this.render();
    }

    render() {
        // Draw the triangle.
        this.tri.clear();
        this.tri.beginFill(this.color, 1);
        this.tri.lineStyle(1.5, 0xFFFFFF);
        if (this.flipped) {
            this.tri.moveTo(0, triHeight);
            this.tri.lineTo(triWidth, triHeight);
            this.tri.lineTo(triWidth / 2, 0);
            this.tri.lineTo(0, triHeight);
        } else {
            this.tri.moveTo(0, 0);
            this.tri.lineTo(triWidth, 0);
            this.tri.lineTo(triWidth / 2, this.height);
            this.tri.lineTo(0, 0);
        }
        this.tri.endFill();

        // Draw the unit.
        if (this.unit instanceof Pusher) {
            if (this.sprite) {
                this.app.stage.removeChild(this.sprite);
            }
            const sideLength = .8 * (triWidth / (1.0 + 2 / Math.sqrt(3)));
            let spriteColor = 0;
            switch (this.unit.team) {
                case 1:
                    spriteColor = 0x1111AA;
                    break;
                case 3:
                    spriteColor = 0x11AA11;
                    break;
                case 2:
                    spriteColor = 0xAA1111;
                    break;
                default:
                    console.log("No color defined")
            }
            this.sprite = new PIXI.Graphics();
            this.sprite.x = this.tri.x + triWidth / 2;
            this.sprite.y = this.tri.y + triHeight / 3;
            if (this.flipped) {
                this.sprite.y += triHeight / 3;
            }
            this.sprite.beginFill(spriteColor, 1);
            this.sprite.lineStyle(1.5, 0xFFFFFF);
            this.sprite.drawRect(-sideLength / 2, -sideLength / 2, sideLength, sideLength);
            switch (this.unit.orientation) {
                case 1:
                    this.sprite.rotation = 2 * Math.PI / 3
                    break;
                case 2:
                    this.sprite.rotation = 4 * Math.PI / 3
                    break;
                default:
                    this.sprite.rotation = 0;
            }
            if (this.tri.flipped) {
                this.sprite.rotation += Math.PI
            }
            this.app.stage.addChild(this.sprite);
        }
    }
}


export default class Board extends React.Component {
    static propTypes = {
        G: PropTypes.any.isRequired,
        ctx: PropTypes.any.isRequired,
        moves: PropTypes.any.isRequired,
        playerID: PropTypes.string,
        isActive: PropTypes.bool,
        isMultiplayer: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.app = new PIXI.Application({
            width: 500, height: 400, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
        });
        this.state = {triangles: []};
        this.myRef = React.createRef();
        const tris = [[]];
        for (let i = 0; i < boardSize; i++) {
            tris[i] = [];
            for (let j = 0; j <= 2 * i; j++) {
                let x = xOffset + (boardSize + j - i - 1) * triWidth / 2;
                let y = yOffset + triHeight * i;
                let tri = new Triangle(x, y, (j + 1) % 2, this.app, this.props.G.cells[i][j], this.props);
                this.state.triangles.push(tri);
                tri.render();
                tris[i].push(tri);
            }
        }
        this.props.G.units.forEach(unit => {
            tris[unit.cell.i][unit.cell.j].addUnit(unit);
            tris[unit.cell.i][unit.cell.j].render();
        });
        this.render = this.render.bind(this);
    }

    componentDidMount() {
        this.myRef.current.appendChild(this.app.view);
        //ReactDOM.findDOMNode(this).appendChild(this.renderer.view);
    }

    render() {
        return <div ref={this.myRef}/>;
    }
}

