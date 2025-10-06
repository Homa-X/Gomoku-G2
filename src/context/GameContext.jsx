import React, { createContext, useContext, useState } from "react";
import { getGames } from "../api";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [players, setPlayers] = useState({
    player1: null,
    player2: null,
  });

  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);

  const fetchGames = async () => {
    try {
      const data = await getGames();
      setGames(data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  return (
    <GameContext.Provider
      value={{
        players,
        setPlayers,
        games,
        setGames,
        fetchGames,
        currentGame,
        setCurrentGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);