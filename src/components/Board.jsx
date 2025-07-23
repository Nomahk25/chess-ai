// src/components/Board.jsx
import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";  // chess.js game logic
import Tile from "./Tile";

const Board = () => {
  // Create a chess game instance
  const [game, setGame] = useState(new Chess());

  // Board is an array of 64 squares with pieces or empty
  const [board, setBoard] = useState([]);

  // On mount or game update, update board state
  useEffect(() => {
    setBoard(game.board()); // chess.js returns 2D array [rank][file]
  }, [game]);

  return (
    <div className="w-[min(90vw,600px)] aspect-square grid grid-cols-8 border border-gray-700">
      {
        // Flatten 2D board to render rows top to bottom, files left to right
        board.flat().map((square, idx) => {
          const piece = square ? square.type : null; // 'p', 'k', etc.
          const color = square ? square.color : null; // 'w' or 'b'
          // Calculate rank and file for each square
          // idx from 0 to 63
          const rank = 7 - Math.floor(idx / 8); // chess.js board is 8x8 array rank 0 at top, so invert
          const file = idx % 8;

          return (
            <Tile
              key={idx}
              piece={piece}
              color={color}
              position={{ rank, file }}
              isLightSquare={(rank + file) % 2 === 1} // classic chessboard coloring
            />
          );
        })
      }
    </div>
  );
};

export default Board;
