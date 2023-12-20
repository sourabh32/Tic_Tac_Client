import React,{ createContext, useState } from 'react';

export const GameContext = createContext();








export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(null);
  const [turn, setTurn] = useState(null);
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  return (
    <GameContext.Provider
      value={{roomId,setRoomId,username,setUsername, gameState, setGameState, player, setPlayer, turn, setTurn }}
    >
      {children}
    </GameContext.Provider>
  );
};


