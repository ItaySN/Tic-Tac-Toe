import React, { useState, useEffect } from 'react';
import Board from './Board';
import './game.css';
import ReactDOM from 'react-dom';
import WriteRecord from  './modal.js';
import axios from 'axios';
import { FaTrophy } from 'react-icons/fa';

function Game() {
    const [state, setState] = useState({
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
      });
      const [isWinner,setWinner] = useState(false);
      const [startTime,setStartTime] = useState();
      const [open, setOpen] = React.useState(false);
      const [records,setRecords] = useState([]);
      
      
      const dateToDisplay = (date) => {
        let displayDate = date.getFullYear() + "-" +
        ("0" + (date.getMonth()+1)).slice(-2) + "-" +
        ("0" + date.getDate()).slice(-2) + " " +
        ("0" + date.getHours()).slice(-2) + ":" +
        ("0" + date.getMinutes()).slice(-2) + ":" +
        ("0" + date.getSeconds()).slice(-2);
        return displayDate;
      }
      
      const handleCloseWinner = async (name) =>  {
        let objRecord = {
          name : name ,
          duration : ((new Date() - startTime)/1000) ,
          date : dateToDisplay(new Date())
        }
        
        await axios.post('/api/v1/post', objRecord);
        setOpen(false);
        newGame();
      }

      const getRecords = async (displayRecords) =>{
          let data = await axios.get('/api/v1/records');
          let leaderboards = data.data.map((record,i) => {
          return (
            <div className="records">
            <li>
            <span className="name-span">Name: <span className="display-rec"> {record.name}</span></span>
            <span className="duration-span">Duaration:<span className="display-rec"> {record.duration}</span></span>  
            <span className="date-span">Date:<span className="display-rec"> {record.date}</span></span>   
          </li>
          </div>)
        })
        setRecords(leaderboards);
        
      }
    function newGame(){
      setState({
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
      })  
      setWinner(false);
    }  


    function handleClick(i) {
      if(state.stepNumber === 0)
      {
        setStartTime(new Date());
      }
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = state.xIsNext ? "X" : "O";
      setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext
      });
    }
  
    function jumpTo(step) {
      setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
        history: state.history
      });
    }
    const history = state.history;
    const current = history[state.stepNumber];
    const winner = calculateWinner(current.squares);
  
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li className="moves-li" key={move}>
          <button className="moves-button" onClick={() =>{ jumpTo(move); setWinner(false)}}>{desc}</button>
        </li>
      );
    });

    useEffect(() => {
      if(winner){
        setWinner(true);
      }
    },[winner])

    useEffect(() => {
      if(!open)
      {
        getRecords();
      }
    },[open])

  
      let status;
      if (winner) {
        status = "The winner is : " + winner;
        
        //setWinner(winner);

        
      } else {
        status = "Next player: " + (state.xIsNext ? "X" : "O");
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div className="status">{status}</div>
            {isWinner && <WriteRecord isWinner = {isWinner} setWinner = {setWinner} handleCloseWinner = {handleCloseWinner} newGame = {newGame} open={open} setOpen={setOpen} />} 
            <ol className="moves">{moves}</ol>
          </div>
          <div className="records">
          <ol><button id="button-leaderboard" onClick={getRecords()}>The Leaderboard <FaTrophy/></button>{records}</ol>
          </div>
          
        </div>
      );
    
  }
  
export default Game;


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
