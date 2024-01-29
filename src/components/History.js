import React from "react";

function History({ history }) {
  return (
    <div className="history">
      <h4>History</h4>
      <ul>
        <li>
          <button>Go to game start</button>
        </li>
        {history.map((move, index) => (
          <li key={index}>
            Player {move.player} moved to square #{move.step}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
