import React, { useState } from "react";

import "./App.css";

function App() {
  const [color, updateColor] = useState("red");
  const newColor = color === "red" ? "blue" : "red";

  return (
    <p
      className="App"
      onClick={() => updateColor(newColor)}
      style={{
        color,
        cursor: "pointer"
      }}
    >
      Click me!
    </p>
  );
}

export default App;
