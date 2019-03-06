import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function countWords(str) {
  if (str.trim().length === 0) {
    return 0;
  }

  return str.trim().split(/\s+/).length;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { text: '' };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    const wc = countWords(this.state.text);

    return (
      <>
        <textarea
          rows="20"
          cols="50"
          value={this.state.text}
          onChange={this.onChange}
        />
        <div style={{ color: wc > 10 ? 'red' : null }}>
          {wc}/10
        </div>
      </>
    );
  }
}

export default App;
