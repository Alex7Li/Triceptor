import ReactDOM from 'react-dom';
import React from 'react';
import {Client} from 'boardgame.io/react';
import Board from './board.js';
import Triceptor from './game.js';

const App = Client({
    game: Triceptor,
    board: Board,
    numPlayers: 3,
    debug: true,
});

ReactDOM.render(<App/>, document.getElementById('root'));
