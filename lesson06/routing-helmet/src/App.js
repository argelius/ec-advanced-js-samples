import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

const Home = () => (
  <>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <h1>Home</h1>
    <p>This is the home page</p>
  </>
);

const Page1 = () => (
  <>
    <Helmet>
      <title>Page 1</title>
    </Helmet>
    <h1>Page 1</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </>
);

const Page2 = () => (
  <>
    <Helmet>
      <title>Page 2</title>
    </Helmet>
    <h1>Page 2</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/page1">Page 1</Link>
              </li>
              <li>
                <Link to="/page2">Page 2</Link>
              </li>
            </ul>
          </nav>
          <main>
            <Route exact path="/" component={Home} />
            <Route path="/page1" component={Page1} />
            <Route path="/page2" component={Page2} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
