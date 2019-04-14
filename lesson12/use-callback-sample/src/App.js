import React, { useState, useCallback } from "react";

function Child(props) {
  const { style = {}, ...rest } = props;

  console.log("rendered!");

  return (
    <div
      style={{
        ...style,
        cursor: "pointer"
      }}
      {...rest}
    >
      Click me!
    </div>
  );
}

const MemoizedChild = React.memo(Child);

function App() {
  const [nbrOfClicks, updateNbrOfClicks] = useState(0);

  const onClick = useCallback(() => {
    updateNbrOfClicks(n => n + 1);
  }, []);

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
      <MemoizedChild onClick={onClick} />
      <MemoizedChild onClick={onClick} />
      <MemoizedChild onClick={onClick} />
      <p>You have clicked {nbrOfClicks} times!</p>
    </div>
  );
}

export default App;
