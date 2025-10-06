import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import ReglerButton from "../components/ReglerButton/ReglerButton";
import StartButton from "../components/StartButton/StartButton";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/setup");
  };

  return (
    <div>
      <Header />
      {/* Container för knappar */}
      <div className={styles.buttonContainer}>
        <StartButton onStart={handleStart} StartButtonText="Starta spelet" />
        <ReglerButton buttonLabel="Regler" />
      </div>
    </div>
  );
};

export default HomePage;
