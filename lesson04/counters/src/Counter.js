import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.onDecrease = this.onDecrease.bind(this);
    this.onIncrease = this.onIncrease.bind(this);
  }

  onDecrease() {
    this.props.onDecrease(this.props.counterIndex);
  }

  onIncrease() {
    this.props.onIncrease(this.props.counterIndex);
  }

  render() {
    return (
      <div>
        <button onClick={this.onDecrease}>-</button>
        {this.props.value}
        <button onClick={this.onIncrease}>+</button>
      </div>
    );
  }
}

export default Counter;
