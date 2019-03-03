import React, { Component } from 'react';
import './App.css';

import Table from './Table';

const data = [
  {
    name: 'Alice',
    age: 21,
  },
  {
    name: 'Bob',
    age: 20,
  },
  {
    name: 'Eve',
    age: 32,
  },
  {
    name: 'Mallory',
    age: 25,
  },
  {
    name: 'Trent',
    age: 18,
  }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <Table data={data} />
      </div>
    );
  }
}

export default App;
