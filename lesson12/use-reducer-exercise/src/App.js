import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return 0;
    case "increase":
      return Math.min(20, state + 1);
    case "decrease":
      return Math.max(0, state - 1);
    default:
      return state;
  }
}

const actions = {
  increase: {
    type: "increase"
  },
  decrease: {
    type: "decrease"
  },
  reset: {
    type: "reset"
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }}
    >
      <span style={{ fontSize: 30 }}>{state}</span>
      <div>
        <button onClick={() => dispatch(actions.increase)}>Increase</button>
        <button onClick={() => dispatch(actions.decrease)}>Decrease</button>
        <button onClick={() => dispatch(actions.reset)}>Reset</button>
      </div>
    </div>
  );
}

export default App;
