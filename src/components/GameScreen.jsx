import React, { useEffect, useState } from 'react';
import './GameScreen.css';


export default function GameScreen(props) {
  const [isXTurn, setIsXTurn] = useState(true);
  const [arrX, setArrX] = useState([])
  const [arrO, setArrO] = useState([])
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [scoreTie, setScoreTie] = useState(0);
  

  const checkWinner = (arrX, arrO) => {
    const winningArrays = [
      ['1','2','3'],
      ['4','5','6'],
      ['7','8','9'], 
      ['1','4','7'], 
      ['2','5','8'], 
      ['3','6','9'], 
      ['1','5','9'], 
      ['3','5','7']
    ]
    arrX.sort()
    let arrXString = JSON.stringify(arrX)
    arrO.sort()
    let arrOString = JSON.stringify(arrO)

    for (let i = 0; i < winningArrays.length; i++) {

      if(arrXString.includes(JSON.stringify(winningArrays[i][0]).slice(1,-1)) 
      && arrXString.includes(JSON.stringify(winningArrays[i][1]).slice(1,-1)) 
      && arrXString.includes(JSON.stringify(winningArrays[i][2]).slice(1,-1))) 
      {
        setScoreX(scoreX + 1)
        props.setWinner("Blue wins the round!")
        props.endGame(true)
        return;
      }
      if(arrOString.includes(JSON.stringify(winningArrays[i][0]).slice(1,-1)) 
      && arrOString.includes(JSON.stringify(winningArrays[i][1]).slice(1,-1)) 
      && arrOString.includes(JSON.stringify(winningArrays[i][2]).slice(1,-1))) 
      {
        setScoreO(scoreO + 1)
        props.setWinner("Yellow wins the round!")
        props.endGame(true)
        return;
      }
        
    }
    if(arrX.length === 5) {
      setScoreTie(scoreTie + 1)
      props.setWinner("Tie! No winner.");
      props.endGame(true)
      return;
    }
  }
  useEffect(() => {
    
    checkWinner(arrX, arrO)
  }, [arrX, arrO])
  
  const selectTile = (e) => {
    if(props.gameEnd) {return}
    if(e.target.classList.length === 2) {return}
    // PVP X vuoro
    if(isXTurn && !props.Pvb) {
      e.target.classList.toggle('selected-cross');
      e.target.innerHTML = "✖"
      document.querySelector('#turn').classList.toggle('turn-yellow');
      document.querySelector('#turn').innerHTML = "O";
      setIsXTurn(false)
      setArrX([...arrX, e.target.id])
    }
    // PVBOT pelaajan vuoro
    if(isXTurn && props.isPvb) {
      console.log("jaa")
      e.target.classList.toggle('selected-cross');
      e.target.innerHTML = "✖"
      document.querySelector('#turn').classList.toggle('turn-yellow');
      document.querySelector('#turn').innerHTML = "O";
      setIsXTurn(false)
      setArrX([...arrX, e.target.id])
      
      //botin vuoro
      console.log(e.target.id)
      
      // let isUsed = true;
      // // console.log(document.getElementById("1"))
      // while (isUsed) {
      //   let rndIndex = Math.floor(Math.random() * 10);
      //   let move = document.getElementById(`${rndIndex}`)
      //   if (move.classList.length === 2) {
      //     console.log("ei voi pelata", move)
      //   }
      //   if ( move.classList.length === 1) {
      //     console.log("voi pelata", move)
      //     isUsed = false
      //   }
      // }
    }
    if(!isXTurn) {
      e.target.classList.toggle('selected-circle');
      e.target.innerHTML = "O";
      document.querySelector('#turn').classList.toggle('turn-yellow');
      document.querySelector('#turn').innerHTML ="✖"
      setIsXTurn(true)
      setArrO([...arrO, e.target.id])
      
    }
    // checkWinner(arrX, arrO)
  }
  const resetBoard = () => {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
      tile.classList = "tile"
      tile.innerHTML = "";
    });
    document.querySelector('#turn').classList = "turn-color"
    document.querySelector('#turn').innerHTML ="✖"
    setIsXTurn(true);
    setArrO([])
    setArrX([])
    props.setRematch(false);
    // tiles.classList.toggle('selected-cross')
  }
  useEffect(() => {
    
    if(props.isRematch) {
      resetBoard()
    }
  }, [props.isRematch])

  return (
    <div className='game-total-container'>
        <div className='game-header'>
            <div className='icons'></div>
            <div className='player-turn'><div id='turn' className='turn-color'>✖</div><div className='turn-text'>Turn</div></div>
            <div className='reset' onClick={resetBoard}><img alt="" src="https://img.icons8.com/material-rounded/24/000000/recurring-appointment.png"/></div>
        </div>
        <div className='tiles'>
            <div className='tile' id="1" onClick={selectTile} key={1}></div>
            <div className='tile' id="2" onClick={selectTile} key={2}></div>
            <div className='tile' id="3" onClick={selectTile} key={3}></div>
            <div className='tile' id="4" onClick={selectTile} key={4}></div>
            <div className='tile' id="5" onClick={selectTile} key={5}></div>
            <div className='tile' id="6" onClick={selectTile} key={6}></div>
            <div className='tile' id="7" onClick={selectTile} key={7}></div>
            <div className='tile' id="8" onClick={selectTile} key={8}></div>
            <div className='tile' id="9" onClick={selectTile} key={9}></div>

        </div>
        <div className='game-footer'>
            <div className='score-cross'>Score<div className='score'>{scoreX}</div></div>
            <div className='score-tie'>Score (tie)<div className='score'>{scoreTie}</div></div>
            <div className='score-circle'>Score<div className='score'>{scoreO}</div></div>
        </div>
    </div>
  )
}
