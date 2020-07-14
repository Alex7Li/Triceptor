import {Game} from 'boardgame.io/core';
import {cells, units} from './setup.js';

const Triceptor = Game({
    name: "Triceptor",

    setup: () => ({
        units: units,
        cells: cells,
    }),

    moves: {
        move: (G, ctx) => {},
        turn: {moveLimit: 1},
    },
});

export default Triceptor;