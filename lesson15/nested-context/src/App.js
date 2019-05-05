import React from 'react';

const NameContext = React.createContext('Bob');

function ChildComponent() {
  return (
    <NameContext.Consumer>
      {value => <p>The value is {value}!</p>}
    </NameContext.Consumer>
  );
}

function App() {
  return (
    <NameContext.Provider value="Bob">
      <NameContext.Provider value="Alice">
        <ChildComponent />
      </NameContext.Provider>
    </NameContext.Provider>
  );
}

export default App;
