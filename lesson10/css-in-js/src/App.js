import React, { Component } from "react";
import { css } from "glamor";

const rule = css({
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  border: "none",
  'text-transform': 'uppercase',
  padding: "10px 20px",
  color: "#a7a6ff",
  transition: "box-shadow 0.4s linear",
  cursor: "pointer",
  "font-size": "14px",
  "background-color": "#4341e8",
  "font-family": '"Press Start 2P", cursive',
  "box-shadow":
    "0 3px 4px 0 rgba(0,0,0,0.14), 0 3px 3px -2px rgba(0,0,0,0.12), 0 1px 8px 0 rgba(0,0,0,0.20)",
  ":hover": {
    "box-shadow":
      "0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20);"
  }
});

const RetroButton = props => <button {...rule} {...props} />;

class App extends Component {
  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <RetroButton>My retro button</RetroButton>
      </div>
    );
  }
}

export default App;
