import React, { Component } from 'react';
import './App.css';

import InchInput from './InchInput';
import InchToCm from './InchToCm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { inches: '1.0' };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      inches: e.target.value,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Convert inches to centimeters</h1>
        <InchInput
          value={this.state.inches}
          onChange={this.onChange}
        />
        <InchToCm inches={this.state.inches} />
      </div>
    );
  }
}

export default App;
