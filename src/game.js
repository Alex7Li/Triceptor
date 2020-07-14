import {Game} from 'boardgame.io/core';
import {cells, units} from './setup.js';
import {secondCell} from './gridhelper';

const Triceptor = Game({
    name: "Triceptor",

    setup: () => ({
        units: units,
        cells: cells,
    }),

    moves: {
        pushMove: function (G, ctx, pushingUnit, dir) {
            console.assert(dir === 'L' || dir === 'R', "pushing backwards is invalid");
            const nextCell = pushingUnit.cellInDir(G.cells, dir)
            let nextNextCell = secondCell(G, pushingUnit, dir);
            if (!nextCell) {
                nextNextCell.unit = nextCell.unit;
                nextCell.unit = null;
                if (dir === 'R') {
                    nextNextCell.unit.orientation = (1 + pushingUnit.orientation) % 3;
                } else if (dir === 'L') {
                    nextNextCell.unit.orientation = (2 + pushingUnit.orientation) % 3;
                }
            }
            // Turn and move current unit.
            if (dir === 'R') {
                pushingUnit.orientation = (2 + pushingUnit.orientation) % 3;
            } else if (dir === 'L') {
                pushingUnit.orientation = (1 + pushingUnit.orientation) % 3;
            }
            pushingUnit.cell = nextCell;
        }
    },
    turn: {moveLimit: 1},
});

export default Triceptor;