import React, { Suspense } from 'react';

const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<p>Loading component...</p>}>
      <LazyComponent />
    </Suspense>
  );
}

export default App;
