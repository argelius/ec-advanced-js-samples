import React, { Component } from 'react';
import './App.css';

import Carousel from './Carousel';

const IMAGES = [
  'https://picsum.photos/400/300?image=1',
  'https://picsum.photos/400/300?image=2',
  'https://picsum.photos/400/300?image=3',
  'https://picsum.photos/400/300?image=4',
  'https://picsum.photos/400/300?image=5'
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carouselIndex: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.onSwipeRight = this.onSwipeRight.bind(this);
  }

  onChange(carouselIndex) {
    this.setState({ carouselIndex: carouselIndex });
  }

  onSwipeRight() {
    const { carouselIndex } = this.state;
    this.setState({ carouselIndex: Math.max(0, carouselIndex - 1) });
  }

  onSwipeLeft() {
    const { carouselIndex } = this.state;
    const nbrOfItems = IMAGES.length;

    this.setState({
      carouselIndex: Math.min(nbrOfItems - 1, carouselIndex + 1),
    });
  }

  render() {
    return (
      <div className="App">
        <Carousel
          images={IMAGES}
          width={400}
          carouselIndex={this.state.carouselIndex}
          onChange={this.onChange}
          onSwipeLeft={this.onSwipeLeft}
          onSwipeRight={this.onSwipeRight}
        />
      </div>
    );
  }
}

export default App;
