import React, { Component } from "react";
import { css } from "glamor";

const rule = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  textTransform: "uppercase",
  padding: "10px 20px",
  color: "#a7a6ff",
  transition: "box-shadow 0.4s linear",
  cursor: "pointer",
  fontSize: "14px",
  backgroundColor: "#4341e8",
  fontFamily: '"Press Start 2P", cursive',
  boxShadow:
    "0 3px 4px 0 rgba(0,0,0,0.14), 0 3px 3px -2px rgba(0,0,0,0.12), 0 1px 8px 0 rgba(0,0,0,0.20)",
  ":hover": {
    boxShadow:
      "0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)"
  }
});

const RetroButton = props => <button {...rule} {...props} />;

class App extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh"
        }}
      >
        <RetroButton>My retro button</RetroButton>
      </div>
    );
  }
}

export default App;
