import { BrowserRouter,Routes,Route } from "react-router-dom";

import React from 'react'
import Home from "./Home";
import PlayBoard from "./PlayBoard";
import { GameProvider } from "./GameContext";
import {Toaster} from "react-hot-toast"
const App = () => {
  return (
    <BrowserRouter>
    
    <GameProvider>
      <Routes>
     
        <Route path="/" element={<Home />} />
        <Route path="/play/:id" element={<PlayBoard />} />
        
      </Routes>
      </GameProvider>
     
    </BrowserRouter>
  )
}

export default App