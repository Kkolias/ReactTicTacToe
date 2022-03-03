import React, { useState } from 'react';
import './App.css';
import GameScreen from './components/GameScreen';
import WinningScreen from './components/WinningScreen';
import NewGame from './components/NewGame';

function App() {
  const [isGame, setGame] = useState(false);
  const [gameEnd, endGame] = useState(false);
  const [newGame, startGame] = useState(true);
  const [isWinner, setWinner] = useState("");
  const [isRematch, setRematch] = useState(false);
  const [isPvb, setPvb] = useState(false);
  
  
 
  return (
    <div className="App">
      <h2 className="header">Tic Tac Toe</h2>
      <div class="total-container">
        {isGame && <GameScreen isPvb={isPvb} isRematch={isRematch} gameEnd={gameEnd} setRematch={setRematch} setWinner={setWinner} endGame={endGame}/>}
        {newGame && <NewGame onStart={setGame} startVisible={startGame} setPvb={setPvb}/>}
      </div>
       {gameEnd && <WinningScreen setRematch={setRematch} setWinner={isWinner} startGame={startGame} setGame={setGame} endGame={endGame}/>}
    </div>
  );
}

export default App;
