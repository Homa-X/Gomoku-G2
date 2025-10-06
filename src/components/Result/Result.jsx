import React from "react";
import Confetti from "react-confetti"; 
import styles from "./Result.module.css";
import { useNavigate } from "react-router-dom";


const Result = ({ winner, isGameOver, onPlayAgain }) => {
  const navigate = useNavigate();
  if (!isGameOver) return null;

  return (
    <div className={styles.overlay}>
      <Confetti recycle={false} 
      numberOfPieces={300} 
      gravity={0.2} />
      <div className={styles.resultBox}>
        <h2 className={styles.resultName}>🎉 Vinnare: {winner?.name || "Ingen vinnare"} 🎉</h2>
        <div className={styles.buttons}>
          <button onClick={onPlayAgain} className={styles.playAgain}>
            Spela Igen
          </button>
          <button onClick={() => navigate("/")} className={styles.exit}>
            Avsluta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
