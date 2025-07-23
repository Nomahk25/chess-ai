// src/components/Board.jsx
import React, { useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import Tile from "./Tile";

const Board = () => {
  const game = useRef(new Chess()); // Persistent Chess instance
  const [board, setBoard] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [status, setStatus] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);


  // Load board layout from chess.js
  const updateBoard = () => {
    setBoard(game.current.board());
  };

  // Update game status (turn, checkmate, draw)
  const updateStatus = () => {
  if (game.current.isCheckmate()) {
    setStatus(
      `Checkmate! ${game.current.turn() === "w" ? "Black" : "White"} wins`
    );
    setIsGameOver(true);
  } else if (game.current.isDraw()) {
    setStatus("Draw!");
    setIsGameOver(true);
  } else {
    setStatus(`${game.current.turn() === "w" ? "White" : "Black"}'s Turn`);
    setIsGameOver(false);
  }
};

  // Initial load
  useEffect(() => {
    updateBoard();
    updateStatus();
  }, []);

  // Convert rank/file to square name like "e2"
  const coordsToSquare = ({ rank, file }) => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    return files[file] + (rank + 1);
  };

  // Handle clicking a tile
const handleTileClick = (rank, file) => {
  if (isGameOver) return;

  const square = coordsToSquare({ rank, file });
  const piece = game.current.get(square);

  if (selectedSquare) {
    if (square === selectedSquare) {
      // Clicking the same piece again — deselect
      setSelectedSquare(null);
      return;
    }

    // If player clicks a different piece of their own — change selection
    if (piece && piece.color === game.current.turn()) {
      setSelectedSquare(square);
      return;
    }

    // Attempt move to destination square
    const move = game.current.move({
      from: selectedSquare,
      to: square,
      promotion: "q",
    });

    if (move) {
      updateBoard();
      updateStatus();
      setSelectedSquare(null);

      // Let AI move
      setTimeout(() => {
        makeAIMove();
      }, 500);
    } else {
      // Invalid move → deselect anyway
      setSelectedSquare(null);
    }
  } else {
    // No piece selected yet — only allow selecting player's own piece
    if (piece && piece.color === game.current.turn()) {
      setSelectedSquare(square);
    }
  }
};


  // Simple AI: random legal move
  const makeAIMove = () => {
    if (game.current.isGameOver()) return;

    const moves = game.current.moves();
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    game.current.move(randomMove);
    updateBoard();
    updateStatus();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-white text-xl font-semibold">{status}</h2>

      <div className="w-[min(90vw,550px)] aspect-square grid grid-cols-8 grid-rows-8 border border-gray-700">
        {board.flat().map((square, idx) => {
          const piece = square ? square.type : null;
          const color = square ? square.color : null;
          const rank = 7 - Math.floor(idx / 8);
          const file = idx % 8;
          const squareName = coordsToSquare({ rank, file });

          return (
            <Tile
              key={idx}
              piece={piece}
              color={color}
              isLightSquare={(rank + file) % 2 === 1}
              isSelected={selectedSquare === squareName}
              onClick={() => handleTileClick(rank, file)}
              disabled={isGameOver}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;
