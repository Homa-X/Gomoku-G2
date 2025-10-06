import React from "react";
import PropTypes from "prop-types";
import styles from "./StartButton.module.css"; 

export default function StartButton({ onStart, StartButtonText = "Starta spelet" }) {
  return (
    <div>
      <button className={styles.startButton} onClick={onStart}>
        {StartButtonText}
      </button>
    </div>
  );
}

StartButton.propTypes = {
  onStart: PropTypes.func,
  StartButtonText: PropTypes.string,
};
