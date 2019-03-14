import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './Home';
import Beer from './Beer';

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <h1>
            <Link to="/">Punk API</Link>
          </h1>

          <Route exact path="/" component={Home} />
          <Route path="/:id" component={Beer} />
        </>
      </Router>
    );
  }
}

export default App;
