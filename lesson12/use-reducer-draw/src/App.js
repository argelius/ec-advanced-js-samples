import React, { useReducer } from "react";

import Grid from "./Grid";
import ColorPicker from "./ColorPicker";
import { createEmptyGrid } from "./utils";
import reducer from "./reducer";
import * as actions from "./actions";

function init() {
  return {
    grid: createEmptyGrid(),
    selectedColor: "black",
    brushSize: 1,
    tool: "brush"
  };
}

function App() {
  const [state, dispatch] = useReducer(reducer, null, init);

  const { grid, selectedColor, brushSize, tool } = state;

  return (
    <div style={styles.container}>
      <h1>Andreas Paint</h1>
      <Grid grid={grid} onClickCell={idx => dispatch(actions.fillCell(idx))} />
      <ColorPicker
        selectedColor={selectedColor}
        onSelectColor={color => dispatch(actions.selectColor(color))}
      />
      <label>
        Brush size&nbsp;
        <input
          onChange={e =>
            dispatch(actions.selectBrushSize(parseInt(e.target.value)))
          }
          value={brushSize}
          type="number"
          min="1"
          max="3"
        />
      </label>
      <label>
        Brush&nbsp;
        <input
          onChange={() => dispatch(actions.selectTool("brush"))}
          checked={tool === "brush"}
          type="radio"
          name="tool"
        />
      </label>
      <label>
        Bucket&nbsp;
        <input
          onChange={() => dispatch(actions.selectTool("bucket"))}
          checked={tool === "bucket"}
          type="radio"
          name="tool"
        />
      </label>
      <button onClick={() => dispatch(actions.clearImage())}>Clear</button>
    </div>
  );
}
const styles = {
  container: {
    display: "inline-flex",
    flexDirection: "column",
    padding: 10,
    userSelect: "none"
  }
};

export default App;
