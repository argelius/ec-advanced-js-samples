export function fillCell(idx) {
  return {
    type: "fill_cell",
    idx
  };
}

export function selectColor(color) {
  return {
    type: "select_color",
    color
  };
}

export function selectBrushSize(size) {
  return {
    type: "select_brush_size",
    size
  };
}

export function selectTool(tool) {
  return {
    type: "select_tool",
    tool
  };
}

export function clearImage() {
  return {
    type: "clear_image"
  };
}
