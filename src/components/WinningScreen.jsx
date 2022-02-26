import React from 'react';
import './WinningScreen.css';

export default function WinningScreen(props) {

  const quit = () => {
    props.startGame(true)
    props.setGame(false)
    props.endGame(false)
  }
  const rematch = () => {
    props.setGame(true)
    props.endGame(false)
    props.setRematch(true)
  }

  return (
    <div className='winner-container'>
        <div className='winner-text'>{props.setWinner}</div>
        <div className='play-again-container'>
            <div className='quit' onClick={quit}>Quit</div>
            <div className='rematch' onClick={rematch}>Rematch</div>
        </div>
    </div>
  )
}
