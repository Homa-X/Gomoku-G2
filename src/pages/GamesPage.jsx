// src/pages/GamesPage.jsx
import React, { useEffect } from "react";
import { useGame } from "../context/GameContext";
import { createGame } from "../api";

const GamesPage = () => {
  const { games, fetchGames } = useGame();

  const addGame = async () => {
    try {
      await createGame();
      fetchGames();
    } catch (error) {
      console.error("Kunde inte lägga till spel", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Alla Spel</h1>
      <button
        onClick={addGame}
        style={{
          background: "linear-gradient(to right, #a855f7, #ec4899)",
          color: "white",
          border: "none",
          padding: "0.7rem 1.2rem",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Lägg till nytt spel
      </button>

      {games && games.length > 0 ? (
        <ul style={{ marginTop: "1.5rem" }}>
          {games.map((game, index) => (
            <li key={index}>{game.name || `Spel #${index + 1}`}</li>
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: "1.5rem" }}>Inga spel tillgängliga</p>
      )}
    </div>
  );
};

export default GamesPage;
