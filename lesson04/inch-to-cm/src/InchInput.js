import React, { Component } from 'react';

class InchInput extends Component {
  render() {
    return (
      <>
        <label>
          <input value={this.props.value} type="text" onChange={this.props.onChange} />
          inches
        </label>
      </>
    );
  }
}

export default InchInput;
