import React, { Component } from 'react';
import axios from 'axios';

class Beer extends Component {
  constructor(props) {
    super(props);

    this.state = { beer: null };
  }

  componentDidMount() {
    this.source = axios.CancelToken.source();
    const { id } = this.props.match.params;

    axios.get(`https://api.punkapi.com/v2/beers/${id}`, { cancelToken:
      this.source.token })
      .then((response) => {
        this.setState({ beer: response.data[0] });
      })
      .catch((err) => {
        /**
         * Do error handling here
         */
      });
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
    const { beer } = this.state;

    if (beer === null) {
      return <p>Fetching beer...</p>;
    }

    return (
      <>
        <h2>{beer.name}</h2>
        <p><em>{beer.tagline}</em></p>
        <img src={beer.image_url} alt={beer.name} height="250" />
        <p>{beer.description}</p>
      </>
    );
  }
}

export default Beer;
