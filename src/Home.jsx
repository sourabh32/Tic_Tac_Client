import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { GameContext } from './GameContext';

import socket from './socketFile'
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  
 
  const navigate = useNavigate();
  const { setTurn, setGameState, setPlayer, roomId, setRoomId, setUsername } = useContext(GameContext);

  useEffect(() => {
    

    const handlePlayerJoined = (data) => {
      toast.success(`Joined ${roomId}`)
        setGameState(data.board);
        setPlayer(data.symbol);
        setTurn(data.turn);
        navigate(`/play/${roomId}`);
    
    };


    const handleRoomJoinError = (data) => {
      console.log(data)
      toast.error(`${data.message} `);
    };

    
    socket.on('playerJoined', handlePlayerJoined);
    socket.on('roomJoinError', handleRoomJoinError);

    return () => {
      
      socket.off('playerJoined', handlePlayerJoined);
      socket.off('roomJoinError', handleRoomJoinError);
    };
  }, [navigate, roomId, setGameState, setPlayer, setTurn]);

  const handleJoinGame = async () => {
    try {
      socket.emit('joinRoom', { roomName: roomId});
    } catch (error) {
      console.error('Error joining the game:', error);
    }
  };

  

  return (<>
  <Toaster />
  <div className='board-screen'>
      <h1 className='main-heading'>Join a Game</h1>
    
      
     
        <input placeholder='Enter roomId...' type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
      
      <br />
      <button className='restart-btn' onClick={handleJoinGame}>Join Game</button>
      
    </div>
  
  </>
    
    
  );
};

export default Home;
