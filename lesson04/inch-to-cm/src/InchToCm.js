import React, { Component } from 'react';

class InchToCm extends Component {
  render() {
    const cm = 2.54 * parseFloat(this.props.inches);

    return (
      <p>
        {this.props.inches}&Prime; = {cm}cm
      </p>
    );
  }
}

export default InchToCm;
