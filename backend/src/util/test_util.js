/**
 * Utility method to create a random square depending on board.
 * @param board
 * @returns {{col: number, row: number}}
 */
const randomSquare = (board) => {
    let col = Math.floor(Math.random() * board.cols) + 1;
    let row = Math.floor(Math.random() * board.rows) + 1;
    return {col: col, row: row};
}

/**
 * Utility method to create a random diagonal sequence of five tiles depending on board.
 * @param board
 * @returns {[{col: number, row: number},{col: number, row: number},{col: number, row: number},{col: number, row: number},{col: number, row: number}]}
 */
const randomDiagonal = (board) => {
    let col = Math.floor(Math.random() * (board.cols-board.minInRow)) + 1;
    let row = Math.floor(Math.random() * (board.rows-board.minInRow)) + 1;
    return [
        {col: col, row: row},
        {col: col + 1, row: row + 1},
        {col: col + 2, row: row + 2},
        {col: col + 3, row: row + 3},
        {col: col + 4, row: row + 4}
    ];
}

/**
 * Utility method to create a random horisontal sequence of five tiles depending on board.
 * @param board
 * @returns {[{col: number, row},{col: number, row: number},{col: number, row: number},{col: number, row: number},{col: number, row: number}]}
 */
const randomHorisontal = (board) => {
    let col = Math.floor(Math.random() * (board.cols-board.minInRow)) + 1;
    let row = Math.floor(Math.random() * board.rows) + 1;
    return [
        {col: col, row: row},
        {col: col + 1, row: row},
        {col: col + 2, row: row},
        {col: col + 3, row: row},
        {col: col + 4, row: row}
    ];
}

/**
 * Utility method to create a random vertical sequence of five tiles depending on board.
 * @param board
 * @returns {[{col: number, row: number},{col: number, row: number},{col: number, row: number},{col: number, row: number},{col: number, row: number}]}
 */
const randomVertical = (board) => {
    let col = Math.floor(Math.random() * board.cols) + 1;
    let row = Math.floor(Math.random() * (board.rows-board.minInRow)) + 1;
    return [
        {col: col, row: row},
        {col: col, row: row + 1},
        {col: col, row: row + 2},
        {col: col, row: row + 3},
        {col: col, row: row + 4}
    ];
}

/**
 * Utility method to fill a board without win
 */
const fillBoard = (board) => {
    let player = 0;
    for(let col = 0; col < board.tiles.length; col++){
        for(let row = 0; row < board.tiles.length; row++){
            board.tiles[col][row] = ++player;
        }
    }
    return board;
}

module.exports = {randomSquare, randomVertical, randomHorisontal, randomDiagonal, fillBoard}