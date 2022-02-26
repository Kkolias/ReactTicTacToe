import React from 'react';
import './NewGame.css'

export default function NewGame(props) {

    const handlePvb = (e) => {
        // props.onStart(true)
        // props.startVisible(false)
      e.target.innerHTML = "Under work!";
      setTimeout(() => {
        e.target.innerHTML = "Play against bot"
      }, 2000);
      return;
    }
    const handlePvp = () => {
        props.onStart(true)
        props.startVisible(false)
    }

  return (
    <div className='new-game-container'>
        <div className='newgame'>Start a new game!</div>
        <div className='play-against-bot' onClick={handlePvb}>Play against bot</div>
        <div className='play-against-player' onClick={handlePvp}>Play with friend</div>
    </div>
  )
}
