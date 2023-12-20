// PlayBoard.js

import React, { useState, useEffect, useContext } from 'react';

import { useParams } from 'react-router-dom';
import {GameContext} from './GameContext';
import socket from './socketFile';
import ChatBox from './ChatBox';
import toast, { Toaster } from 'react-hot-toast';


function PlayBoard() {
 

 
const {player,turn,gameState,setGameState,setTurn,roomId} = useContext(GameContext)
  const [error, setError] = useState('');
  const [winner,setWinner] = useState(null);
 
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });
  
    socket.on('updateGame', (updatedGameState) => {
     
      setGameState(updatedGameState.board);
      setTurn(updatedGameState.turn);
    });
    socket.on('winner', (data) => {
      
      toast.success(`Winner ${data.winner}`)
      setWinner(data.winner);
    });
    socket.on('restartGame', (data) => {
      setWinner(null)
     toast.success("Game restarted")
      setGameState(data.board)
    });
    socket.on('invalidMove',(msg)=>{
      toast.error(msg)
    })
    socket.on('receiveMsg', (data) => {
      toast.success(`Recived message from opponent (${data.text})`,{
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    })
  
    return () => {
      socket.off('updateGame');
      socket.off('winner')
      socket.off('restartGame')
      socket.off('receiveMsg')
      socket.off('invalidMove')
    };
  }, [socket]);
  

  


  const makeMove = (index) => {
    console.log('clicked')
    
    socket.emit('makeMove', { roomName:roomId, index, player });
  };
  const handleRestart =()=>{
    console.log('restarted')
    socket.emit('restart',{roomName:roomId})
  }
  const handleMessage =(msg)=>{
   
    socket.emit('sendMsg',{roomName:roomId,text:msg})
  }

  return (
    <div className='board-screen'>
       <Toaster/>
      <h1 className='main-heading'>Tic Tac Toe</h1>
    
      {error && <div style={{ color: 'red' }}>{error}</div>}
     
      
      {gameState && (
        <div>
       
          {player ===turn ? 
          (<p className="turn">
            {'Your turn'}
          </p >):(<p  className="turn">
            {'Opponents turn'}
          </p >)
          }
          <div className='board'>
            {gameState.map((cell, index) => (
              <button key={index} onClick={() => makeMove(index)} disabled={ cell !== null}>
                {cell}
              </button>
            ))}
          </div>
        </div>
      )}

      <ChatBox handleMesasge={handleMessage} />
       {winner && (<>
       <div className="winner">
         <h2>Winner is {winner}</h2>
         
       </div>
       <button className='restart-btn' onClick={handleRestart}>Restart</button>
       </>)}
    </div>
  );
}

export default PlayBoard;
