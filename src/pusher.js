import {Unit} from './unit.js';
import {secondCell} from './gridhelper';

export class Pusher extends Unit {
    constructor(cell, team, orientation) {
        super(cell, team, orientation)
        this.canMove = this.canMove.bind(this);
        this.move = this.move.bind(this);
    }

    // Can you go to a given cell?
    canMove(G, toCell) {
        if (toCell === this.cellInDir(G.cells, 'R')) {
            return 'R';
        } else if (toCell === this.cellInDir(G.cells, 'L')) {
            return 'L';
        }
        return false;
    }

    /*
     * Move to a cell. Return an truthy array of changed cells on success, and a falsy
     * value on failure.
     */
    move(toCell, props) {
        const G = props.G;
        const dir = this.canMove(G, toCell)
        if (dir) {
            props.moves.move();
            props.events.endTurn();
            const nextCell = this.cellInDir(G.cells, dir)
            let nextNextCell = secondCell(G, this, dir);
            if (!nextCell) {
                if (nextNextCell) {
                    nextNextCell.unit = nextCell.unit;
                    if (dir === 'R') {
                        nextNextCell.unit.orientation = (1 + this.orientation) % 3;
                    } else if (dir === 'L') {
                        nextNextCell.unit.orientation = (2 + this.orientation) % 3;
                    }
                } else {
                    nextCell.unit.markDead();
                }
                nextCell.unit = this;
            }
            // Turn and move current unit.
            if (dir === 'R') {
                this.orientation = (2 + this.orientation) % 3;
            } else if (dir === 'L') {
                this.orientation = (1 + this.orientation) % 3;
            }
            this.cell = nextCell;
            return [nextCell.unit, nextNextCell?.unit];
        } else {
            return false;
        }
    }
}