import React, { useState } from "react";

function Circle() {
  const [color, setColor] = useState(getRandomColor());
  const [position, setPosition] = useState(getRandomPosition());

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getRandomPosition() {
    const x = Math.floor(Math.random() * (window.innerWidth - 200));
    const y = Math.floor(Math.random() * (window.innerHeight - 200));
    return { x, y };
  }

  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        backgroundColor: color,
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        cursor: "pointer"
      }}
    />
  );
}

export default Circle;
