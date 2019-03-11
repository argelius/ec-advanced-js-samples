import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Links from './Links';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>
        <Links>
          Check out http://www.google.com
        </Links>
        </p>
        <p>
          <Links>
            google.com is a search engine
          </Links>
        </p>
      </div>
    );
  }
}

export default App;
