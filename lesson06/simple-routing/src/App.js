import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Home = () => (
  <>
    <h1>Home</h1>
    <p>This is the home page</p>
  </>
);

const Page1 = () => (
  <>
    <h1>Page 1</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </>
);

const Page2 = () => (
  <>
    <h1>Page 2</h1>
    <img src="https://picsum.photos/200/300/?random" alt="Random" />
  </>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/page1">Page 1</Link></li>
              <li><Link to="/page2">Page 2</Link></li>
            </ul>
          </nav>
          <Route exact path="/" component={Home} />
          <Route path="/page1" component={Page1} />
          <Route path="/page2" component={Page2} />
        </div>
      </Router>
    );
  }
}

export default App;
