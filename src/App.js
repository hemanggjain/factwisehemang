import React, { useState } from "react";
import "./App.css";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(squares);
  const isTie = !winner && squares.every(Boolean);

  function handleClick(index) {
    if (squares[index] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[index] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }

  return (
    <div className="container">
      <h1>TIC-TAC-TOE</h1>
      <h2>
        {winner
          ? Player ${winner} won!
          : isTie
          ? "It's a tie!"
          : Player ${isXNext ? "X" : "O"}'s turn}
      </h2>

      <Board squares={squares} onClick={handleClick} />

      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
}

function Board({ squares, onClick }) {
  return (
    <div className="board">
      {squares.map((value, index) => (
        <button key={index} className="square" onClick={() => onClick(index)}>
          {value}
        </button>
      ))}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default App;