import {adjCell} from './gridhelper.js';

export class Unit {
    /*
    Orientation in a triangle:
    ......^......
    side0/^\side1
    ..../ |0\....
    .../  |  \...
    ../ 2   1 \..
    ./<--   -->\.
    ______________
    ....side2.....
    OR
    ....side2....
    _____________
    .\<--   -->/.
    ..\ 1   2 /..
    ...\  |  /...
    ....\ |0/....
    side1\v/side0
    ......v......
    */
    constructor(cell, team, orientation) {
        this.cell = cell;
        this.team = team; // int
        this.orientation = orientation; //int
        this.cellInDir = this.cellInDir.bind(this);
    }

    cellInDir(cells, direction) {
        return adjCell(cells, this.cell, this.orientation, direction)
    }

    /*
     * All subclasses will implement these:
     * Move to a cell. Return an truthy array of changed cells on success, and a falsy
     * value on failure.
     * move()
     */
}
