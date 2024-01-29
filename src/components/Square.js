import React from "react";

function Square({ handleClick, squareValue }) {
  return (
    <button className={"square"} onClick={handleClick}>
      {squareValue}
    </button>
  );
}

export default Square;
