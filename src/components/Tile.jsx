// src/components/Tile.jsx
import React from "react";

// Map piece types + color to image filenames in /public/assets/
// For example: w_pawn.png, b_king.png etc.
const pieceImages = {
  pw: "/assets/wP.png",
  nw: "/assets/wK.png",
  bw: "/assets/wB.png",
  rw: "/assets/wR.png",
  qw: "/assets/wQ.png",
  kw: "/assets/wK.png",

  pb: "/assets/bP.png",
  nb: "/assets/bK.png",
  bb: "/assets/bB.png",
  rb: "/assets/bR.png",
  qb: "/assets/bQ.png",
  kb: "/assets/bK.png",
};

const Tile = ({ piece, color, isLightSquare }) => {
  // Background color classes for light and dark squares
  const bgClass = isLightSquare ? "bg-gray-200" : "bg-gray-700";

  // Compose key to get image path
  const pieceKey = piece && color ? piece + color : null;
  const pieceSrc = pieceKey ? pieceImages[pieceKey] : null;

  return (
    <div
      className={`${bgClass} w-full h-full flex justify-center items-center`}
      // You can add onClick here later for moves
    >
      {pieceSrc && (
        <img
          src={pieceSrc}
          alt={`${color === "w" ? "White" : "Black"} ${piece}`}
          className="w-10 h-10"
          draggable={false} // prevent default drag image
        />
      )}
    </div>
  );
};

export default Tile;
