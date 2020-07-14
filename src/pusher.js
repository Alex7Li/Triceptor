import {Unit} from './unit.js';

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
            props.moves.pushMove(this, dir);
            props.events.endTurn();
            console.log("Moved");
            return true;
        } else {
            return false;
        }
    }
}