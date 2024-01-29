import React, { useState, useEffect } from "react";
import Board from "./Board";
import History from "./History";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const newWinner = calculateWinner(squares);
    setWinner(newWinner);
  }, [squares]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  //Handle player
  const handleClick = (i) => {
    if (squares[i]) {
      return;
    }
    let newSquare = [...squares];
    let historyStep;
    if (xIsNext) {
      newSquare[i] = `X`;
      setXIsNext(false);
      historyStep = { player: `X`, step: i };
    } else {
      newSquare[i] = `O`;
      setXIsNext(true);
      historyStep = { player: `O`, step: i };
    }
    setSquares(newSquare);
    setHistory([...history, historyStep]);
  };
  // Undo move
  const handleUndo = (i) => {
    let updatedHistory = [...history];
    let updatedSquares = [...squares];

    const lastMove = updatedHistory.pop();

    if (lastMove) {
      updatedSquares[lastMove.step] = null;
    }

    setSquares(updatedSquares);
    setHistory(updatedHistory);
    setXIsNext(!xIsNext);
  };

  //Restart game
  const handlRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setHistory([]);
  };

  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>
      <div className="game">
        <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
        <Board squares={squares} handleClick={handleClick} />
        <History history={history} />
      </div>
      <div className="game-btn">
        <button onClick={handlRestart} className="restart-btn">
          Restart
        </button>
        <button onClick={handleUndo} className="undo-btn">
          Undo Move
        </button>
      </div>
    </div>
  );
}

export default Game;
