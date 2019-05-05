import React from 'react';

const NameContext = React.createContext('Andreas');

function ChildComponent() {
  return (
    <NameContext.Consumer>
      {value => (
        <p>Hello {value}!</p>
      )}
    </NameContext.Consumer>
  );
}

function ParentComponent() {
  return (
    <ChildComponent />
  );
}

function App() {
  return (
    <div
      style={{
        fontSize: 60,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <NameContext.Provider value="Andreas">
        <ParentComponent />
      </NameContext.Provider>
    </div>
  );
}

export default App;
