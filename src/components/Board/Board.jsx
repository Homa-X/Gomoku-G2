import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../context/GameContext";
import { createGame, createPlayer, joinGame, playMove } from "../../api";
import ResetButton from "../ResetButton/ResetButton";
import Result from "../Result/Result";
import styles from "./Board.module.css";

const Board = () => {
  const { players, setPlayers } = useGame();
  const [game, setGame] = useState(null);
  const [currentPlayerId, setCurrentPlayerId] = useState(null);
  const [winner, setWinner] = useState(null); // holds player id when someone wins
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (!players.player1 || !players.player2) {
        navigate("/setup");
        return;
      }

      try {
        // create backend players
        const p1 = await createPlayer();
        const p2 = await createPlayer();

        // store backend ids in context
        setPlayers({
          player1: { ...players.player1, id: p1.id },
          player2: { ...players.player2, id: p2.id },
        });

        // create & join game
        const g = await createGame();
        await joinGame(g.id, p1.id);
        await joinGame(g.id, p2.id);

        setGame(g);
        setCurrentPlayerId(p1.id);
        setWinner(null);
      } catch (err) {
        console.error("Init error:", err);
        alert("Could not initialize game. Check backend.");
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // helper: robust tile access (handles both tiles[col][row] and tiles[row][col])
  const safeGetTile = (board, col, row) => {
    if (!board || !board.tiles) return undefined;
    if (board.tiles[col] && board.tiles[col][row] !== undefined) return board.tiles[col][row];
    if (board.tiles[row] && board.tiles[row][col] !== undefined) return board.tiles[row][col];
    return undefined;
  };

  const getBoardSize = (board) => {
    if (!board || !board.tiles) return { cols: 0, rows: 0 };
    const cols = board.cols !== undefined ? board.cols : board.tiles.length;
    let rows = board.rows;
    if (rows === undefined) {
      // try tiles[0] length if present
      rows = board.tiles[0] ? board.tiles[0].length : board.tiles.length;
    }
    return { cols, rows };
  };

  // check win anywhere on board (5 in a row horizontally, vertically, diagonally)
  const checkWin = (board) => {
    const { cols, rows } = getBoardSize(board);
    if (!cols || !rows) return null;
    const need = 5;

    const inBounds = (c, r) => safeGetTile(board, c, r) !== undefined;

    const tileAt = (c, r) => safeGetTile(board, c, r);

    const checkDir = (startC, startR, dC, dR) => {
      const first = tileAt(startC, startR);
      if (!first || first === 0) return false;
      for (let k = 1; k < need; k++) {
        const nc = startC + dC * k;
        const nr = startR + dR * k;
        if (!inBounds(nc, nr)) return false;
        if (tileAt(nc, nr) !== first) return false;
      }
      return true;
    };

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        // horizontal (→)
        if (c + need - 1 < cols && checkDir(c, r, 1, 0)) return tileAt(c, r);
        // vertical (↓)
        if (r + need - 1 < rows && checkDir(c, r, 0, 1)) return tileAt(c, r);
        // diag down-right (↘)
        if (c + need - 1 < cols && r + need - 1 < rows && checkDir(c, r, 1, 1)) return tileAt(c, r);
        // diag up-right (↗)
        if (c + need - 1 < cols && r - (need - 1) >= 0 && checkDir(c, r, 1, -1)) return tileAt(c, r);
      }
    }

    return null;
  };

  // handle a click — col, row order (col first for backend)
  const handleCellClick = async (colIdx, rowIdx) => {
    // block everything if no game / no player / or game already won
    if (!game || !currentPlayerId || winner) return;

    // ensure tile is empty
    const existing = safeGetTile(game.board, colIdx, rowIdx);
    if (existing !== 0 && existing !== undefined) {
      return; // occupied
    }

    try {
      // call backend with col,row order
      const updated = await playMove(game.id, currentPlayerId, colIdx, rowIdx);
      setGame(updated);

      // run frontend win detection on the updated board
      const winnerPiece = checkWin(updated.board); // returns 1 or 2 or null
      if (winnerPiece) {
        // map piece (1/2) -> player id (we assume first joined = player1 = piece 1)
        const winnerId = winnerPiece === 1 ? players.player1.id : players.player2.id;
        setWinner(winnerId);
        return; // stop here — no turn switch
      }

      // No winner: switch turn
      setCurrentPlayerId(
        currentPlayerId === players.player1.id ? players.player2.id : players.player1.id
      );
    } catch (err) {
      // backend rejected move (occupied or wrong turn)
      console.error("playMove error:", err.response || err.message || err);
      alert("❌ Ogiltigt drag eller inte din tur!");
    }
  };

  const handleReset = () => {
    setPlayers({ player1: null, player2: null });
    navigate("/setup");
  };

  if (!game) return <p>Laddar spelet...</p>;

  return (
    <div className={styles.boardContainer}>
      
       {/* Result-overlay alltid renderad */}
      <Result 
      winner={
        winner === players.player1.id
          ? players.player1
          : winner === players.player2.id
          ? players.player2
          : null
      }
      isGameOver={!!winner}
      onPlayAgain={handleReset}
    />
      <button onClick={handleReset} className={styles.backBtn}>
        ⬅ Tillbaka
      </button>

      <div className={styles.header}>
        <div
          className={`${styles.playerCard} ${
            currentPlayerId === players.player1.id ? styles.activePlayer : ""
          }`}
        >
          <span className={styles.playerPiece}>
            {players.player1.piece === "red" ? "🔴" : "🟡"}
          </span>
          <span>{players.player1.name}</span>
        </div>

        <span className={styles.vs}>vs</span>

        <div
          className={`${styles.playerCard} ${
            currentPlayerId === players.player2.id ? styles.activePlayer : ""
          }`}
        >
          <span className={styles.playerPiece}>
            {players.player2.piece === "red" ? "🔴" : "🟡"}
          </span>
          <span>{players.player2.name}</span>
        </div>
      </div>

   

      {/* 5x5 display — use row-major for rendering but safeGetTile used to read */}
      <div className={styles.board} style={{ pointerEvents: winner ? "none" : "auto" }}>
        {Array.from({ length: 5 }).map((_, rowIdx) => (
          <div key={rowIdx} className={styles.row}>
            {Array.from({ length: 5 }).map((__, colIdx) => {
              const tile = safeGetTile(game.board, colIdx, rowIdx);
              return (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  className={`${styles.cell} ${
                    tile === 1 ? styles.red : tile === 2 ? styles.yellow : ""
                  }`}
                  onClick={() => handleCellClick(colIdx, rowIdx)}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className={styles.resetWrapper}>
        <ResetButton label="Starta Om" onClick={handleReset} />
      </div>
    </div>
  );
};

export default Board;
