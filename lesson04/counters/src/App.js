import React, { Component } from 'react';
import './App.css';

import Counter from './Counter';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { counter0: 0, counter1: 0, counter2: 0 };

    this.onDecreaseCounter = this.onDecreaseCounter.bind(this);
    this.onIncreaseCounter = this.onIncreaseCounter.bind(this);

    this.onIncreaseAll = this.onIncreaseAll.bind(this);
    this.onDecreaseAll = this.onDecreaseAll.bind(this);
    this.onResetAll = this.onResetAll.bind(this);
  }

  onDecreaseCounter(counterIndex) {
    const counter = `counter${counterIndex}`;

    this.setState((prevState) => {
      return { [counter]: prevState[counter] - 1 };
    });
  }

  onIncreaseCounter(counterIndex) {
    const counter = `counter${counterIndex}`;

    this.setState((prevState) => {
      return { [counter]: prevState[counter] + 1 };
    });
  }

  onIncreaseAll() {
    this.setState({
      counter0: this.state.counter0 + 1,
      counter1: this.state.counter1 + 1,
      counter2: this.state.counter2 + 1,
    });
  }

  onDecreaseAll() {
    this.setState({
      counter0: this.state.counter0 - 1,
      counter1: this.state.counter1 - 1,
      counter2: this.state.counter2 - 1,
    });
  }

  onResetAll() {
    this.setState({
      counter0: 0,
      counter1: 0,
      counter2: 0,
    });
  }

  render() {
    return (
      <div className="App">
        <Counter
          value={this.state.counter0}
          counterIndex={0}
          onDecrease={this.onDecreaseCounter}
          onIncrease={this.onIncreaseCounter}
        />
        <Counter
          value={this.state.counter1}
          counterIndex={1}
          onDecrease={this.onDecreaseCounter}
          onIncrease={this.onIncreaseCounter}
        />
        <Counter
          value={this.state.counter2}
          counterIndex={2}
          onDecrease={this.onDecreaseCounter}
          onIncrease={this.onIncreaseCounter}
        />
        <button onClick={this.onDecreaseAll}>Decrease all</button>
        <button onClick={this.onIncreaseAll}>Increase all</button>
        <button onClick={this.onResetAll}>Reset all</button>
      </div>
    );
  }
}

export default App;
