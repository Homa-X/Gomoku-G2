// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api/gomoku", // backend base url
});

// ---- Players ----
export const createPlayer = async () => {
  const res = await API.get("/player/create");
  return res.data;
};

export const getPlayers = async () => {
  const res = await API.get("/players");
  return res.data;
};

export const getPlayerById = async (id) => {
  const res = await API.get(`/player/${id}`);
  return res.data;
};

// ---- Games ----
export const createGame = async () => {
  const res = await API.get("/games/add");
  return res.data;
};

export const getGames = async () => {
  const res = await API.get("/games");
  return res.data;
};

export const getGameById = async (id) => {
  const res = await API.get(`/games/${id}`);
  return res.data;
};

export const joinGame = async (gameId, playerId) => {
  const res = await API.get(`/player/join/${gameId}/${playerId}`);
  return res.data;
};

export const playMove = async (gameId, playerId, col, row) => {
  const res = await API.get(`/player/play/${gameId}/${playerId}/${col}/${row}`);
  return res.data;
};
