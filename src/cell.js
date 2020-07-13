// Game data of a cell
export class Cell {
    /*
     * The constructor takes the minimum to define the game state.
     * The cell edges are defined by later calling the makeCellGraph
     * function.
    */
    constructor(i, j, /* int */ team) {
        this.i = i;
        this.j = j;
        this.team = team;
        this.hasUnit = this.hasUnit.bind(this)
    }

    hasUnit(units) {
        let unitFound = null;
        const thisCell = this;
        units.forEach(function (unit) {
            if (unit.cell === thisCell) {
                unitFound = unit;
            }
        })
        return unitFound;
    }
}
