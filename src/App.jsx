import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";  
import HomePage from "./pages/HomePage";
import GameSetup from "./pages/GameSetup";
import Board from "./components/Board/Board";
import GamesPage from "./pages/GamesPage";
import "./App.css"; 


function App() {
  return (
      <BrowserRouter>
      <GameProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/setup" element={<GameSetup />} />
            <Route path="/board" element={<Board />} />
            <Route path="/games" element={<GamesPage />} />
          </Routes>
        </div>
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;