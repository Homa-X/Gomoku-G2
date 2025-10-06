import React from "react";
import styles from "./ResetButton.module.css";

export default function ResetButton({ label = "Starta Om", onClick }) {
  return (
    <button className={styles.resetBtn} onClick={onClick} aria-label="reset-game">
      {label}
    </button>
  );
}
