// src/components/Board.jsx
import React, { useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import Tile from "./Tile";

const Board = () => {
  const game = useRef(new Chess()); // persistent Chess instance
  const [board, setBoard] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null); // Track selected piece

  // Load board layout from chess.js
  const updateBoard = () => {
    setBoard(game.current.board());
  };

  useEffect(() => {
    updateBoard(); // initial load
  }, []);

  // Convert rank/file to square notation like "e2"
  const coordsToSquare = ({ rank, file }) => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    return files[file] + (rank + 1);
  };

  const handleTileClick = (rank, file) => {
    const square = coordsToSquare({ rank, file });

    if (selectedSquare) {
      const move = game.current.move({
        from: selectedSquare,
        to: square,
        promotion: "q",
      });

      if (move) {
        updateBoard(); // Refresh board after move
      }

      setSelectedSquare(null); // Reset selection
    } else {
      const piece = game.current.get(square);
      if (piece && piece.color === game.current.turn()) {
        setSelectedSquare(square);
      }
    }
  };

  return (
    <div className="w-[min(90vw,600px)] h-[min(90vw,600px)] grid grid-cols-8 border border-gray-700">
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
          />
        );
      })}
    </div>
  );
};

export default Board;
