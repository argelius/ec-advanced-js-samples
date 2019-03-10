import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Hello = () => (
  <p>Hej! Jag är en komponent!</p>
);

const HelloProps = ({ name }) => (
  <p>Hello, {name}!</p>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Hello />
        <HelloProps name="Andreas" />
      </div>
    );
  }
}

export default App;
