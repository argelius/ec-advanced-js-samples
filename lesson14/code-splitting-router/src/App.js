import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function lazyPage(Component) {
  return function() {
    return (
      <Suspense fallback={<div>Loading page...</div>}>
        <Component />
      </Suspense>
    );
  }
}

const Home = lazyPage(React.lazy(() => import('./Home')));
const PageA = lazyPage(React.lazy(() => import('./PageA')));
const PageB = lazyPage(React.lazy(() => import('./PageB')));

function App() {
  return (
    <Router>
      <h1><Link to="/">My page</Link></h1>
      <Route exact path="/" component={Home} />
      <Route path="/page-a" component={PageA} />
      <Route path="/page-b" component={PageB} />
    </Router>
  );
}

export default App;
