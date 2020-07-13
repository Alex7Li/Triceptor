import {boardSize} from './constants.js';

// if you are on a given cell with a given orientation,
// what is the cell to the right?
export function adjCell(cells, cell, orientation, direction) {
    const i = cell.i;
    const j = cell.j;
    let dir_code;
    switch (direction) {
        case 'L': //left
            dir_code = 0
            break;
        case 'R': //right
            dir_code = 1
            break;
        case 'B': //back
            dir_code = 2
            break;
        default:
            console.log("Specified nonexistant direction");
    }
    const rel_dir = (dir_code + orientation + 3) % 3;
    if (j % 2 === 0) {
        if (rel_dir === 0 && j !== 0) {
            return cells[i][j - 1]
        }
        if (rel_dir === 1 && j !== 2 * i) {
            return cells[i][j + 1]
        }
        if (rel_dir === 2 && i !== boardSize - 1) {
            return cells[i + 1][j + 1]
        }
        return null;
    } else {
        if (rel_dir === 0) {
            return cells[i][j + 1]
        } else if (rel_dir === 1) {
            return cells[i][j - 1]
        } else if (rel_dir === 2) {
            return cells[i - 1][j - 1]
        }
    }
}

/*
Rotate a triangle 120 degrees clockwise around a pivot
triangle.
*/
function rotate120(pivoti, pivotj, i, j) {
    //First, shift the board so that the unit is at (0,0)
    i -= pivoti;
    j -= pivotj;
    /*Now, moving right is +(0,1), moving left is +(1,0),
    and moving down is +(1,1). Call f the result of a
    2pi/3 rotation clockwise. 
    f(0,-1) = (1,1)
    f(1,1) = (0,1)
    f(0,1) = (0,-1)
    Using these 3 basis elements, we can rotate anything.
    And this even works for upsidedown cells!
    */
    const downMoves = i;
    j -= downMoves;
    const rightMoves = j;
    if (rightMoves > 0) {
        i = rightMoves;
        j = downMoves + rightMoves;
    } else {
        i = rightMoves;
        j = downMoves;
    }
    // shift board back to pivot
    i += pivoti;
    j += pivotj;
    return {i: i, j: j};
}
