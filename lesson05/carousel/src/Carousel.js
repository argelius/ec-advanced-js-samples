import React, { Component } from 'react';
import Hammer from 'hammerjs';

import './Carousel.css';

function renderImage(url) {
  return (
    <img
      src={url}
      alt='Carousel item'
      className="Carousel__image"
    />
  );
}

function renderControls(n, carouselIndex, onChange) {
  const circle = String.fromCharCode(9675);
  const filledCircle = String.fromCharCode(9679);

  return (
    <div className="Carousel__controls">
      {Array(n).fill(null).map((_, i) => (
        <button
          className="Carousel__button"
          onClick={() => onChange(i)}
        >
          {carouselIndex === i ? filledCircle : circle}
        </button>
      ))}
    </div>
  );
}

class Carousel extends Component {

  constructor(props) {
    super(props);
    this.carouselRef = React.createRef();
  }

  componentDidMount() {
    this.hammertime = new Hammer(this.carouselRef.current);
    this.hammertime.on('swipeleft', this.props.onSwipeLeft);
    this.hammertime.on('swiperight', this.props.onSwipeRight);
  }

  componentWillUnmount() {
    this.hammertime.destroy();
    this.hammertime = null;
  }

  render() {
    const {
      images,
      width,
      carouselIndex,
      onChange,
    } = this.props;

    const nbrOfItems = images.length;

    return (
      <div
        style={{
          width: width,
        }}
        className="Carousel"
        ref={this.carouselRef}
      >
        <div
          className="Carousel__images"
          style={{
            transform: `translateX(-${carouselIndex * width}px)`,
          }}
        >
          {images.map(renderImage)}
        </div>
        {renderControls(
          nbrOfItems,
          carouselIndex,
          onChange
        )}
      </div>
    );
  }
}

export default Carousel;
