import React, { useState } from "react";

import "./App.css";

function calculateBmi(weight, height) {
  return weight / (height / 100) ** 2;
}

function BodyMassIndexCalculator() {
  const [weight, updateWeight] = useState(70);
  const [height, updateHeight] = useState(175);

  return (
    <>
      <h1>BMI Calculator</h1>
      <form className="App-form">
        <label className="App-label">
          <div className="App-label-name">Weight</div>
          <input
            type="number"
            value={weight}
            step={0.1}
            onChange={e => updateWeight(parseFloat(e.target.value))}
          />
          &nbsp;kg
        </label>
        <label className="App-label">
          <div className="App-label-name">Height</div>
          <input
            type="number"
            value={height}
            step={0.1}
            onChange={e => updateHeight(parseFloat(e.target.value))}
          />
          &nbsp;cm
        </label>

        <p>BMI = {calculateBmi(weight, height).toFixed(2)}</p>
      </form>
    </>
  );
}

function App() {
  return <BodyMassIndexCalculator />;
}

export default App;
