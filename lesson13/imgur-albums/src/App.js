import React, { useRef, useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

const API_ROOT = "https://api.imgur.com/3";
const CLIENT_ID = "f82cb8f8252a0a6";

function makeThumbnailLink(src) {
  const parts = src.split(".");
  parts[parts.length - 2] += "s";
  return parts.join(".");
}

function loadAlbums() {
  const albums = localStorage.getItem("albums");

  if (albums) {
    return JSON.parse(albums);
  }

  return [];
}

function saveAlbums(albums) {
  localStorage.setItem("albums", JSON.stringify(albums));
}

function Album({ match, location }) {
  const [images, updateImages] = useState([]);
  const [progress, updateProgress] = useState(0);

  const fileInputRef = useRef(null);

  const { id, deletehash } = match.params;

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    const file = fileInputRef.current.files[0];

    const headers = {
      Authorization: `Client-ID ${CLIENT_ID}`
    };

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      updateProgress(0);

      axios
        .post(`${API_ROOT}/upload`, formData, {
          headers,
          onUploadProgress: e => {
            updateProgress(e.loaded / e.total);
          }
        })
        .then(response => {
          updateProgress(0);
          updateImages([...images, response.data.data]);

          return axios.post(`${API_ROOT}/album/${deletehash}/add`, {
            deletehashes: response.data.data.deletehash,
          }, {
            headers,
          });
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch(error => {
          updateProgress(0);
        });
    }
  }, [deletehash, images]);

  useEffect(() => {
    axios.get(`${API_ROOT}/album/${id}/images?${Math.random()}`, {
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
      },
    })
    .then((response) => {
      updateImages(response.data.data);
    });
  }, [id]);

  return (
    <>
      <h2>{location.state.album.title}</h2>

      <form onSubmit={onSubmit}>
        <input
          type="file"
          ref={fileInputRef}
        />
        <button type="submit">Upload</button>
      </form>
      <div>
        <progress value={progress} max={1} />
      </div>
      {images.map((image) => (
        <a key={image.id} href={image.link}>
          <img src={makeThumbnailLink(image.link)} />
        </a>
      ))}
    </>
  );
}

function Home() {
  const [title, updateTitle] = useState("");
  const [albums, updateAlbums] = useState(loadAlbums());

  function deleteAlbum(deletehash) {
    axios.delete(`${API_ROOT}/album/${deletehash}`, {
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
      },
    })
      .then((response) => {
        updateAlbums(albums.filter(x => x.deletehash !== deletehash));
      });
  }

  const onSubmit = useCallback(
    e => {
      e.preventDefault();

      updateTitle('');

      axios
        .post(
          `${API_ROOT}/album`,
          { title },
          {
            headers: {
              Authorization: `Client-ID ${CLIENT_ID}`
            }
          }
        )
        .then(response => {
          updateAlbums([
            ...albums,
            {
              title,
              ...response.data.data
            }
          ]);
        });
    },
    [title]
  );

  useEffect(() => {
    saveAlbums(albums);
  }, [albums]);

  return (
    <>
      <h1>Add album</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={title}
          onChange={e => updateTitle(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link to={{
              pathname: `/albums/${album.id}/${album.deletehash}`,
              state: { album },
            }}>{album.title}</Link>
            <button onClick={() =>
              deleteAlbum(album.deletehash)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  return (
    <Router>
      <Link to="/"><h1>Home</h1></Link>
      <Route exact path="/" component={Home} />
      <Route path="/albums/:id/:deletehash" component={Album} />
    </Router>
  );
}

export default App;
