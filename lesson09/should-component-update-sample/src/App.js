import React, { Component } from 'react';

class Numbers extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.n !== this.props.n;
  }

  render() {
    console.log("render");

    const numbers = Array(this.props.n)
      .fill(null)
      .map((_, idx) => idx);

    return (
      <>
        {numbers.map(x => <span key={x}>{x} </span>)}
      </>
    );
  }
}

function Numbers2(props) {
  console.log("render");

  const numbers = Array(props.n)
    .fill(null)
    .map((_, idx) => idx);

  return (
    <>
      {numbers.map(x => <span key={x}>{x} </span>)}
    </>
  );
}

const Numbers2Memo = React.memo(Numbers2);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { color: 'red' };

    this.toggleColor = this.toggleColor.bind(this);
  }

  toggleColor() {
    const { color } = this.state;

    this.setState({ color: color === 'red' ? 'blue' : 'red' });
  }

  render() {
    return (
      <>
        <p
          style={{ color: this.state.color }}
          onClick={this.toggleColor}
        >
          Click me!
        </p>
        <Numbers2Memo n={50000} />
      </>
    );
  }
}

export default App;
