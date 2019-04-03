import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';

let currentId = 0;

function generateNewId() {
  const rv = `item-${currentId}`;
  currentId += 1;
  return rv;
}

class App extends Component {
  state = {
    items: [],
    value: '',
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { value, items } = this.state;

    if (value.trim().length === 0) {
      return;
    }

    this.setState({
      value: '',
      items: [...items, {
        id: generateNewId(),
        value,
      }],
    });
  }

  deleteItem(e) {
    const { items } = this.state;
    const { id } = e.target.dataset;

    this.setState({
      items: items.filter(item => item.id !== id),
    });

  }

  render() {
    const { items, value } = this.state;

    return (
      <div className="App">
        <h1>React Transition Group</h1>
        <form onSubmit={this.onSubmit}>
          <label>
            Add new item&nbsp;
            <input
              type="text"
              onChange={this.onChange}
              value={value}
            />
          </label>
        </form>

        <ul className="App-list">
          <TransitionGroup>
          {items.map(item => (
            <CSSTransition
              key={item.id}
              classNames="App-item"
              timeout={500}
            >
              <li className="App-list-item">
                {item.value}
                <button
                  className="App-delete-button"
                  onClick={this.deleteItem}
                  data-id={item.id}
                >
                  Delete
                </button>
              </li>
            </CSSTransition>
          ))}
          </TransitionGroup>
        </ul>
      </div>
    );
  }
}

export default App;
