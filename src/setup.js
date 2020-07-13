import {Pusher} from './pusher.js';
import {Cell} from './cell.js';
import {boardSize} from './constants.js';

// Setup the cells and units for the game.
export const cells = [[]]
export const units = []
for(let i = 0; i < boardSize; i++){
  cells.push([]);
  for(let j = 0; j <= 2*i; j++){
    let unit = null;
    const cellToAdd = new Cell(i,j, null);
    cells[i].push(cellToAdd);
    if(j===0 && i!==0){
      unit = new Pusher(cellToAdd, 1, 1);
      cellToAdd.team = 1;
    } else if(i===boardSize-1 && j%2===0){
      unit = new Pusher(cellToAdd, 3, 0);
      cellToAdd.team = 3;
    } else if(j===2*i){
      unit = new Pusher(cellToAdd, 2, 2);
      cellToAdd.team = 2;
    }
    if(unit){
      units.push(unit);
    }
  }
}
