import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beers: [],
    };
  }

  componentDidMount() {
    this.source = axios.CancelToken.source();

    axios.get('https://api.punkapi.com/v2/beers', { cancelToken:
      this.source.token })
      .then((response) => {
        this.setState({ beers: response.data });
      })
      .catch((err) => {
        /**
         * Do error handling here.
         */
      });
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
    if (this.state.beers.length === 0) {
      return <p>Loading beers...</p>;
    }

    return (
      <ul>
        {this.state.beers.map((beer) => (
          <li key={beer.id}>
            <Link to={`/${beer.id}`}>{beer.name}</Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default Home;
