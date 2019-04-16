import { floodFill, drawWithBrush, createEmptyGrid } from './utils';

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

export default reducer;
