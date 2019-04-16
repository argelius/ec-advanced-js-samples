import React from "react";

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
    <div style={styles.container}>
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
              ...styles.cell,
              backgroundColor: color,
              ...additionalStyles
            }}
          />
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    display: "inline-flex",
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
    margin: "10px 0"
  },
  cell: {
    height: 20,
    flexGrow: 1,
    borderTop: "1px solid black",
    borderLeft: "1px solid black",
    cursor: "pointer"
  }
};

export default ColorPicker;
