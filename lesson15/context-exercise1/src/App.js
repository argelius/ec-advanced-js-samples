import React from "react";

const NameContext = React.createContext("Andreas");

function countCharacters(str, characters) {
  return Array.from(str).reduce(
    (acc, cur) => acc + characters.toLowerCase().includes(cur.toLowerCase()),
    0
  );
}

function CountConsonants() {
  const CONSONANTS = "BCDFGHJKLMNPQRSTVXZWY";

  return (
    <NameContext.Consumer>
      {value => (
        <p>
          {value} has {countCharacters(value, CONSONANTS)} consonants
        </p>
      )}
    </NameContext.Consumer>
  );
}

function CountVowels() {
  const VOWELS = "AEIOU";

  return (
    <NameContext.Consumer>
      {value => (
        <p>
          {value} has {countCharacters(value, VOWELS)} vowels
        </p>
      )}
    </NameContext.Consumer>
  );
}

function App() {
  return (
    <NameContext.Provider value="Andreas">
      <CountConsonants />
      <CountVowels />
    </NameContext.Provider>
  );
}

export default App;
