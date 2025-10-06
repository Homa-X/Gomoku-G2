import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import InputField from "../components/InputField/InputField";
import ChoosePiece from "../components/ChoosePiece";

import styles from "./GameSetup.module.css";

const GameSetup = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const navigate = useNavigate();
  const [player1Piece, setPlayer1Piece] = useState(null);

  const { setPlayers } = useGame();
  const handleStartGame = () => {
    if (!player1 || !player2) {
      alert("Båda spelarna måste ange sina namn!");
      return;
    }
    if (!player1Piece) {
      alert("Spelare 1 måste välja sin spelpjäs!");
      return;
    }

    const player2Piece = player1Piece === "red" ? "yellow" : "red";
    
    setPlayers({
      player1: { name: player1, piece: player1Piece },
      player2: { name: player2, piece: player2Piece },
    });

    navigate("/board");
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Game Setup</h1>

      <div className={styles.inputGroup}>
        <InputField
          id="player1"
          label="Spelare 1"
          placeholder="Ange namn"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
        />
        <InputField
          id="player2"
          label="Spelare 2"
          placeholder="Ange namn"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />
      </div>
 <div>
        <h3>Spelare 1 väljer sin pjäs:</h3>
        <div className={styles.choosePieceWrapper}>
        <ChoosePiece value={player1Piece} 
        onChange={setPlayer1Piece}
        options={[
          { id: "yellow", label: "Gul", icon: "🟡" },
          { id: "red",    label: "Röd", icon: "🔴" },
      ]}
        />
        </div>
      </div>
       {player1Piece && (
        <p className={styles.selectionInfo}>
          {player1} väljer: {player1Piece === "yellow" ? "🟡 Gul" : "🔴 Röd"} <br/>
          {player2} får: {player1Piece === "yellow" ? "🔴 Röd" : "🟡 Gul"}
        </p>
      )}
       <button className={styles.startBtn} onClick={handleStartGame}>
        Börja Spela
      </button>
    </div>
  );
};

export default GameSetup;
