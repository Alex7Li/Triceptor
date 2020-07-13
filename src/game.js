import {Game} from 'boardgame.io/core';
import {cells, units} from './setup.js';

const Triceptor = Game({
    name: "Triceptor",

    setup: () => ({
        cells: cells,
        units: units
    }),

    moves: {
        pushMove: function (G, ctx, pushingUnit, dir) {
            const nextCell = pushingUnit.cellInDir(G.cells, dir)
/*            if (nextCell.unit) {
                // Next cell is not empty.
                nextCell.unit.orientation = pushingUnit.orientation;
                let secondCell = null;
                // TODO TODO
                if (dir === 'R') {
                    secondCell = nextCell.cellInDir(G.cells, 'L');
                } else if (dir === 'L') {
                    secondCell = nextUnit.cellInDir(G.cells, 'R');
                }
                secondCell.unit = nextCell.unit;
                nextCell.unit = null;
            }*/
            //turn and move current unit
            if (dir === 'R') {
                pushingUnit.orientation = (2 + pushingUnit.orientation) % 3;
            } else if (dir === 'L') {
                pushingUnit.orientation = (1 + pushingUnit.orientation) % 3;
            }
            pushingUnit.cell = nextCell;
        }
    },
    turn: { moveLimit: 1 },


});

export default Triceptor;