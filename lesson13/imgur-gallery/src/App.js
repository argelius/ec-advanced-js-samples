import React, { useState, useRef, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

const API_ROOT = "https://api.imgur.com/3";
// const CLIENT_ID = 'bc0b43f194f5a04';
const CLIENT_ID = "f82cb8f8252a0a6";

function loadImages() {
  const images = window.localStorage.getItem("images");

  if (images) {
    return JSON.parse(images);
  }

  return [];
}

function saveImages(images) {
  window.localStorage.setItem("images", JSON.stringify(images));
}

function makeThumbnailLink(src) {
  const parts = src.split(".");

  parts[parts.length - 2] += "s";

  return parts.join(".");
}

function Home() {
  const [images, updateImages] = useState(loadImages());
  const [progress, updateProgress] = useState(0);

  const fileInputRef = useRef(null);

  const onSubmit = useCallback(e => {
    e.preventDefault();

    const file = fileInputRef.current.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      updateProgress(0);

      axios
        .post(`${API_ROOT}/upload`, formData, {
          headers: {
            Authorization: `Client-ID ${CLIENT_ID}`
          },
          onUploadProgress: e => {
            updateProgress(e.loaded / e.total);
          }
        })
        .then(response => {
          console.log(response.data);
          updateImages([...images, response.data]);
          updateProgress(0);
        })
        .catch(error => {
          updateProgress(0);
        });
    }
  }, []);

  useEffect(
    () => {
      saveImages(images);
    },
    [images]
  );

  console.log(images);

  return (
    <>
      <h1>Image gallery</h1>
      <form onSubmit={onSubmit}>
        <input type="file" ref={fileInputRef} />
        <button type="submit">Upload</button>
        <div>
          <progress value={progress} max={1} />
        </div>
      </form>
      <div>
        {images.map(image => (
          <a
            key={image.id}
            style={{
              display: "inline-block",
              margin: "10px 10px 10px 0"
            }}
            href={image.data.link}
          >
            <img src={makeThumbnailLink(image.data.link)} />
          </a>
        ))}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
    </Router>
  );
}

export default App;
