import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Hello = () => (
  <p>Hej! Jag är en komponent!</p>
);

const HelloProps = (props) => (
  <p>Hello, {props.name} {props.surname}!</p>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { name: 'Bob' };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <input type="text" onChange={this.onChange} value={this.state.name} />
        <Hello />
        <HelloProps name={this.state.name} surname="Hope" />
      </div>
    );
  }
}

export default App;
