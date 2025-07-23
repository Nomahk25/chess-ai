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

const Tile = ({ piece, color, isLightSquare, isSelected, onClick, disabled }) => {
  const bgClass = isLightSquare ? "bg-gray-200" : "bg-gray-700";
  const selectedClass = isSelected ? "ring-4 ring-yellow-400" : "";
  const pieceKey = piece && color ? piece + color : null;
  const pieceSrc = pieceKey ? pieceImages[pieceKey] : null;

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`${bgClass} ${selectedClass} w-full h-full flex justify-center items-center cursor-pointer`}
    >
      {pieceSrc && (
        <img
          src={pieceSrc}
          alt={`${color === "w" ? "White" : "Black"} ${piece}`}
          className="w-10 h-10"
          draggable={false}
        />
      )}
    </div>
  );
};

export default Tile;