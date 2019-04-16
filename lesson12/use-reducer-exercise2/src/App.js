import React, { useReducer } from "react";

function NumPad({ onClickKey }) {
  const oneToNine = [7, 8, 9, 4, 5, 6, 1, 2, 3];

  return (
    <div style={styles.numpad}>
      <div style={styles.numpadOneToNine}>
        {oneToNine.map(n => (
          <button
            style={styles.numpadOneToNineKey}
            key={n}
            onClick={() => onClickKey(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <button onClick={() => onClickKey(0)}>0</button>
    </div>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "add_digit":
      return (state + action.digit).substr(0, 10);
    case "go_back":
      return state.substr(0, state.length - 1);
    case "clear":
      return "";
    default:
      return state;
  }
}

function addDigit(digit) {
  return {
    type: "add_digit",
    digit
  };
}

function clear() {
  return {
    type: "clear"
  };
}

function goBack() {
  return {
    type: "go_back"
  };
}

function App() {
  const [number, dispatch] = useReducer(reducer, "");

  return (
    <div style={styles.container}>
      <div style={styles.number}>{number}&nbsp;</div>
      <NumPad onClickKey={digit => dispatch(addDigit(digit))} />
      <button onClick={() => dispatch(goBack())}>Back</button>
      <button onClick={() => dispatch(clear())}>Clear</button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 200,
    margin: "0 auto",
    justifyContent: 'center',
    minHeight: '100vh',
  },
  numpad: {
    display: "flex",
    flexDirection: "column"
  },
  numpadOneToNine: {
    display: "flex",
    flexWrap: "wrap"
  },
  numpadOneToNineKey: {
    flexBasis: "33.3333%"
  },
  number: {}
};

export default App;
