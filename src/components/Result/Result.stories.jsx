import React from "react";
import Result from "./Result";

export default {
  title: "Components/Result",
  component: Result,
};

export const WinnerRed = () => (
  <Result
    winner={{ name: "Spelare 1" }}
    isGameOver={true}
    onPlayAgain={() => alert("Spela igen klickad!")}
  />
);

export const WinnerYellow = () => (
  <Result
    winner={{ name: "Spelare 2" }}
    isGameOver={true}
    onPlayAgain={() => alert("Spela igen klickad!")}
  />
);

export const NoWinner = () => (
  <Result
    winner={null}
    isGameOver={false}
    onPlayAgain={() => alert("Spela igen klickad!")}
  />
);