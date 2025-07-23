// src/components/Board.jsx
import React, { useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import Tile from "./Tile";

const Board = () => {
  const game = useRef(new Chess());
  const [board, setBoard] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);

  const updateBoard = () => {
    setBoard(game.current.board());
  };

  useEffect(() => {
    updateBoard();
  }, []);

  // Convert rank/file to "e2", "d4", etc.
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
        updateBoard();
        setSelectedSquare(null);

        // Let AI move after short delay
        setTimeout(() => {
          makeAIMove();
        }, 500);
        return;
      }

      setSelectedSquare(null); // Reset even if move failed
    } else {
      const piece = game.current.get(square);
      if (piece && piece.color === game.current.turn()) {
        setSelectedSquare(square);
      }
    }
  };

  // Simple AI: play a random legal move
  const makeAIMove = () => {
    if (game.current.isGameOver()) return;

    const moves = game.current.moves();
    const randomMove = moves[Math.floor(Math.random() * moves.length)];

    game.current.move(randomMove);
    updateBoard();
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
