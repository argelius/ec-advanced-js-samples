import React, { useState } from "react";

import "./App.css";

const PETS = ["cats", "dogs", "fish", "birds", "horses"];

function App() {
  const [favoritePet, updateFavoritePet] = useState("birds");

  return (
    <>
      <p>What is your favorite pet?</p>
      <form className="App-form">
        {PETS.map(pet => (
          <label key={pet}>
            <input
              type="radio"
              name="favorite_pet"
              checked={favoritePet === pet}
              onChange={() => updateFavoritePet(pet)}
            />
            {pet}
          </label>
        ))}
      </form>
      <p>I like {favoritePet} too!</p>
    </>
  );
}

export default App;
