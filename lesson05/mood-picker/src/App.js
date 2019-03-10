import React, { Component } from 'react';
import './App.css';

import MoodPicker from './MoodPicker';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mood: 'content',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(mood) {
    this.setState({ mood });
  }

  render() {
    const { mood } = this.state;

    return (
      <div className="App">
        <h1>Pick your mood</h1>
        <MoodPicker
          name="mood"
          currentMood={mood}
          onChange={this.onChange}
        />
        <p>Today I am <strong>{mood}</strong>.</p>
      </div>
    );
  }
}

export default App;
