import React from "react";
import { WIDTH, HEIGHT } from "./constants";

function Grid({ grid, onClickCell }) {
  function onMouseMove(e, idx) {
    if (e.buttons) {
      onClickCell(idx);
    }
  }

  return (
    <div style={styles.grid}>
      {grid.map((cell, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: cell,
            ...styles.cell
          }}
          onMouseMove={e => onMouseMove(e, idx)}
          onMouseDown={() => onClickCell(idx)}
        />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "flex",
    flexWrap: "wrap",
    width: WIDTH * 10,
    height: HEIGHT * 10,
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
    margin: "10px 0"
  },
  cell: {
    width: 10,
    height: 10,
    cursor: "pointer",
    borderTop: "1px solid black",
    borderLeft: "1px solid black",
    boxSizing: "border-box"
  }
};

export default Grid;
