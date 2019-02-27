import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 }
  }

  increase() {
    this.setState((prevState) => ({ counter: prevState.counter + 1 }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.increase(), 1000);
  }

  render() {
    return <p>{this.state.counter}</p>
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <>
        <input type="checkbox" value={this.state.show}
      onChange={this.toggleShow} />
        {this.state.show ? <Counter /> : null}
      </>
    );
  }
}

export default App;
