import React, { Component } from "react";

class Square extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.color !== this.props.color ||
      nextProps.id !== this.props.id ||
      nextProps.onClick !== this.props.onClick
    );
  }

  onClick() {
    this.props.onClick(this.props.id);
  }

  render() {
    console.log("render");

    return (
      <>
        <div
          style={{
            width: "50px",
            height: "50px",
            margin: "5px",
            backgroundColor: this.props.color
          }}
          onClick={this.onClick}
        >
          {this.props.id}
        </div>
      </>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: [
        {
          id: 1,
          color: "red"
        },
        {
          id: 2,
          color: "blue"
        },
        {
          id: 3,
          color: "red"
        }
      ]
    };

    this.onClickSquare = this.onClickSquare.bind(this);
    this.addSquare = this.addSquare.bind(this);
  }

  onClickSquare(id) {
    const { squares } = this.state;

    const idx = squares.findIndex(s => s.id === id);

    const newSquare = {
      ...squares[idx],
      color: squares[idx].color === "red" ? "blue" : "red"
    };

    const newSquares = [
      ...squares.slice(0, idx),
      newSquare,
      ...squares.slice(idx + 1)
    ];

    this.setState({ squares: newSquares });
  }

  addSquare() {
    const { squares } = this.state;

    const newSquare = {
      color: 'red',
      id: squares[squares.length - 1].id + 1,
    };

    this.setState({
      squares: [...squares, newSquare],
    });
  }


  render() {
    const { squares } = this.state;

    return (
      <>
        <button onClick={this.addSquare}>Add square</button>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          {squares.map(square => (
            <Square
              color={square.color}
              key={square.id}
              id={square.id}
              onClick={this.onClickSquare}
            />
          ))}
        </div>
      </>
    );
  }
}

export default App;
