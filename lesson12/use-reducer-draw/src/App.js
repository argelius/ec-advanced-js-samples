import React, { useReducer } from "react";

const WIDTH = 16;
const HEIGHT = 16;

function floodFill(grid, color, idx) {
  function fill(grid, col, row, startColor, color) {
    grid[row * WIDTH + col] = color;

    if (row - 1 >= 0 && rv[(row - 1) * WIDTH + col] === startColor) {
      fill(grid, col, row - 1, startColor, color);
    }

    if (row + 1 < HEIGHT && rv[(row + 1) * WIDTH + col] === startColor) {
      fill(grid, col, row + 1, startColor, color);
    }

    if (col - 1 >= 0 && rv[row * WIDTH + col - 1] === startColor) {
      fill(grid, col - 1, row, startColor, color);
    }

    if (col + 1 < WIDTH && rv[row * WIDTH + col + 1] === startColor) {
      fill(grid, col + 1, row, startColor, color);
    }
  }

  /**
   * Edge case.
   */
  if (grid[idx] === color) {
    return grid;
  }

  const rv = [...grid];

  const startColor = rv[idx];

  const col = idx % WIDTH;
  const row = Math.floor(idx / WIDTH);

  fill(rv, col, row, startColor, color);

  return rv;
}

function drawWithBrush(grid, color, size, idx) {
  const rv = [...grid];

  const col = idx % WIDTH;
  const row = Math.floor(idx / WIDTH);

  if (size === 1) {
    rv[idx] = color;
  } else if (size === 2) {
    rv[row * WIDTH + col] = color;

    rv[Math.max(0, row - 1) * WIDTH + col] = color;
    rv[Math.min(HEIGHT - 1, row + 1) * WIDTH + col] = color;

    rv[row * WIDTH + Math.max(0, col - 1)] = color;
    rv[row * WIDTH + Math.min(WIDTH - 1, col + 1)] = color;
  } else if (size === 3) {
    rv[row * WIDTH + col] = color;

    rv[Math.max(0, row - 2) * WIDTH + col] = color;
    rv[Math.max(0, row - 1) * WIDTH + col] = color;
    rv[Math.min(HEIGHT - 1, row + 1) * WIDTH + col] = color;
    rv[Math.min(HEIGHT - 1, row + 2) * WIDTH + col] = color;

    rv[row * WIDTH + Math.max(0, col - 2)] = color;
    rv[row * WIDTH + Math.max(0, col - 1)] = color;
    rv[row * WIDTH + Math.min(WIDTH - 1, col + 1)] = color;
    rv[row * WIDTH + Math.min(WIDTH - 1, col + 2)] = color;

    rv[Math.max(0, row - 1) * WIDTH + Math.max(0, col - 1)] = color;
    rv[Math.max(0, row - 1) * WIDTH + Math.min(WIDTH - 1, col + 1)] = color;
    rv[
      Math.min(HEIGHT - 1, row + 1) * WIDTH + Math.min(WIDTH - 1, col + 1)
    ] = color;
    rv[Math.min(HEIGHT - 1, row + 1) * WIDTH + Math.max(0, col - 1)] = color;
  } else {
    rv[idx] = color;
  }
  return rv;
}

function createEmptyGrid() {
  return Array(WIDTH * HEIGHT).fill("white");
}

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

function ColorPicker({ selectedColor, onSelectColor }) {
  const colors = [
    "white",
    "black",
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "purple",
    "pink",
    "grey"
  ];

  return (
    <div style={styles.colorPicker}>
      {colors.map(color => {
        let additionalStyles = {};

        if (color === selectedColor) {
          additionalStyles = {
            outline: "2px solid red",
            zIndex: 10
          };
        }

        return (
          <div
            key={color}
            onClick={() => onSelectColor(color)}
            style={{
              ...styles.colorPickerCell,
              backgroundColor: color,
              ...additionalStyles
            }}
          />
        );
      })}
    </div>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "fill_cell":
      let grid;

      if (state.tool === "brush") {
        grid = drawWithBrush(
          state.grid,
          state.selectedColor,
          state.brushSize,
          action.idx
        );
      } else if (state.tool === "bucket") {
        grid = floodFill(state.grid, state.selectedColor, action.idx);
      }
      return {
        ...state,
        grid
      };
    case "select_color":
      return {
        ...state,
        selectedColor: action.color
      };
    case "select_brush_size":
      return {
        ...state,
        brushSize: Math.max(1, Math.min(3, action.size))
      };
    case "select_tool":
      return {
        ...state,
        tool: action.tool
      };
    case "clear_image":
      return {
        ...state,
        grid: createEmptyGrid()
      };
    default:
      return state;
  }
}

/**
 * Action creators
 */
function fillCell(idx) {
  return {
    type: "fill_cell",
    idx
  };
}

function selectColor(color) {
  return {
    type: "select_color",
    color
  };
}

function selectBrushSize(size) {
  return {
    type: "select_brush_size",
    size
  };
}

function selectTool(tool) {
  return {
    type: "select_tool",
    tool
  };
}

function clearImage() {
  return {
    type: "clear_image"
  };
}

function init() {
  return {
    grid: createEmptyGrid(),
    selectedColor: "black",
    brushSize: 1,
    tool: "brush",
  };
}

function App() {
  const [state, dispatch] = useReducer(reducer, null, init);

  const { grid, selectedColor, brushSize, tool } = state;

  return (
    <div style={styles.container}>
      <h1>Andreas Paint</h1>
      <Grid grid={grid} onClickCell={idx => dispatch(fillCell(idx))} />
      <ColorPicker
        selectedColor={selectedColor}
        onSelectColor={color => dispatch(selectColor(color))}
      />
      <label>
        Brush size&nbsp;
        <input
          onChange={e => dispatch(selectBrushSize(parseInt(e.target.value)))}
          value={brushSize}
          type="number"
          min="1"
          max="3"
        />
      </label>
      <label>
        Brush&nbsp;
        <input
          onChange={() => dispatch(selectTool("brush"))}
          checked={tool === "brush"}
          type="radio"
          name="tool"
        />
      </label>
      <label>
        Bucket&nbsp;
        <input
          onChange={() => dispatch(selectTool("bucket"))}
          checked={tool === "bucket"}
          type="radio"
          name="tool"
        />
      </label>

      <button onClick={() => dispatch(clearImage())}>Clear</button>
    </div>
  );
}
const styles = {
  container: {
    display: "inline-flex",
    flexDirection: "column",
    padding: 10,
    userSelect: "none"
  },
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
  },
  colorPicker: {
    display: "inline-flex",
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
    margin: "10px 0"
  },
  colorPickerCell: {
    height: 20,
    flexGrow: 1,
    borderTop: "1px solid black",
    borderLeft: "1px solid black",
    cursor: "pointer"
  }
};

export default App;
