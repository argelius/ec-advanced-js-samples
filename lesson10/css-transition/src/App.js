import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import './App.css';

class App extends Component {
  state = { show: false };

  render() {
    return (
      <div className="App">
        <button
          onClick={() => this.setState({ show: true })}
        >
          Show
        </button>
        <p>{ this.state.show ? 'show' : 'hide' }</p>
        <CSSTransition
          classNames="App-message"
          timeout={200}
          unmountOnExit
          in={this.state.show}
        >
        <div className="App-message">
          Hello
          <button
            className="App-close"
            onClick={() => this.setState({ show: false })}
          >
            &times;
          </button>
        </div>
        </CSSTransition>
      </div>
    );
  }
}

export default App;
