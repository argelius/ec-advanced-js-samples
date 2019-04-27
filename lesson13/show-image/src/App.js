import React, { useState } from 'react';

function App() {
  const [urls, updateUrls] = useState([]);

  function onChange(e) {
    const x = Array.from(e.target.files).map(URL.createObjectURL);
    updateUrls(x);
  }

  return (
    <>
      <h1>Select an image</h1>
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .gif, .webp"
        onChange={onChange}
        multiple
      />
      <div>
        <p>Showing {urls.length} images</p>
        {urls.map(url => <img key={url} width={100} src={url} />)}
      </div>
    </>
  );
}

export default App;
