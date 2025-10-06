const path = require("node:path");
require("dotenv").config({
  path: path.join(__dirname, "..", "..", ".env"),
  override: true,
});

const ERR_MSGS = require("../util/error_messages.js");

const MINIMUM_WIN_LENGTH = 5;
const DEFAULT_COLS = 16;
const DEFAULT_ROWS = DEFAULT_COLS;

const COLS = Number.parseInt(process.env.COLS ?? DEFAULT_COLS, 10);
const ROWS = Number.parseInt(process.env.ROWS ?? DEFAULT_ROWS, 10);

console.log("[DEBUG] Board size:", COLS, "x", ROWS);

const createBoard = () => {
  const board = {
    minInRow: MINIMUM_WIN_LENGTH,
    cols: COLS,
    rows: ROWS,
    tiles: [],
  };
  for (let c = 0; c <= COLS; c++) {
    board.tiles[c] = new Array(ROWS + 1).fill(0);
  }
  return board;
};

const isTie = (board) => {
  for (let col = 1; col <= board.cols; col++) {
    for (let row = 1; row <= board.rows; row++) {
      if (board.tiles[col][row] === 0) return false;
    }
  }
  return !isWin(board);
};

const isWin = (board) => {
  for (let col = 1; col <= board.cols; col++) {
    for (let row = 1; row <= board.rows; row++) {
      const t = { col, row };
      if (testRow(diagonal(t), board)) return true;
      if (testRow(horizontal(t), board)) return true;
      if (testRow(vertical(t), board)) return true;
    }
  }
  return false;
};

const play = (board, col, row, player) => {
  if (col <= 0 || row <= 0) throw ERR_MSGS.ERR_TILE_OUT_OF_BOUNDS;
  if (col > COLS || row > ROWS) throw ERR_MSGS.ERR_TILE_OUT_OF_BOUNDS;
  if (board.tiles[col][row] === 0) {
    board.tiles[col][row] = player;
  } else {
    throw new Error(ERR_MSGS.ERR_TILE_OCCUPIED);
  }
  return board;
};

const testRow = (row, board) => {
  for (const tile of row) {
    if (tile.col > board.cols || tile.row > board.rows) return false;
  }
  let p = null;
  for (const tile of row) {
    p = board.tiles[tile.col][tile.row];
    if (p === null || p === 0) return false;
  }
  for (const tile of row) {
    if (board.tiles[tile.col][tile.row] !== p) return false;
  }
  return true;
};

const diagonal = (t) => [
  { col: t.col, row: t.row },
  { col: t.col + 1, row: t.row + 1 },
  { col: t.col + 2, row: t.row + 2 },
  { col: t.col + 3, row: t.row + 3 },
  { col: t.col + 4, row: t.row + 4 },
];

const horizontal = (t) => [
  { col: t.col, row: t.row },
  { col: t.col + 1, row: t.row },
  { col: t.col + 2, row: t.row },
  { col: t.col + 3, row: t.row },
  { col: t.col + 4, row: t.row },
];

const vertical = (t) => [
  { col: t.col, row: t.row },
  { col: t.col, row: t.row + 1 },
  { col: t.col, row: t.row + 2 },
  { col: t.col, row: t.row + 3 },
  { col: t.col, row: t.row + 4 },
];

module.exports = { play, isTie, isWin, createBoard };
