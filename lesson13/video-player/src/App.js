import React, { useState, useRef } from 'react';

function App() {
  const [progress, updateProgress] = useState(0);

  const videoRef = useRef(null);

  function play() {
    videoRef.current.play();
  }

  function pause() {
    videoRef.current.pause();
  }

  function rewind() {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  }

  function onTimeUpdate(e) {
    const { currentTime, duration } = e.target;
    updateProgress(100 * currentTime / duration);
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <video
        src="https://download.blender.org/peach/trailer/trailer_400p.ogg"
        onTimeUpdate={onTimeUpdate}
        ref={videoRef}
      />
      <progress onClick={e => console.log(e.clientX)} style={{ width: '100%' }} value={progress} max={100} />
      <div>
        <button onClick={rewind}>Rewind</button>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
      </div>
    </div>
  );
}

export default App;
