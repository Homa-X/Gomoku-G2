import React from "react";
import Board from "./Board";
import { GameContext } from "../../context/GameContext";  
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Components/Board",
  component: Board,
};

export const Default = () => {
  const mockPlayers = {
    player1: { name: "Abcd", piece: "red" },
    player2: { name: "Qwer", piece: "yellow" },
  };

  return (
    <BrowserRouter>
      <GameContext.Provider value={{ players: mockPlayers, setPlayers: () => {} }}>
        <Board />
      </GameContext.Provider>
    </BrowserRouter>
  );
};
