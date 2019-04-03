import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function updatePerson(key, value) {
  return (prevState) => ({
    person: {
      ...prevState.person,
      [key]: value,
    },
  });
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: 'Andreas',
        occupation: 'Programmer',
      },
    }

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeOccupation = this.onChangeOccupation.bind(this);
  }

  onChangeName(e) {
    /*const { person } = this.state;

    this.setState({
      person: {
        ...person,
        name: e.target.value,
      },
    });*/

    this.setState(updatePerson(
      'occupation',
      e.target.value,
    ));
  }

  onChangeOccupation(e) {
    /*const { person } = this.state;

    this.setState({
      person: {
        ...person,
        occupation: e.target.value,
      },
    });*/

    this.setState(updatePerson(
      'occupation',
      e.target.value,
    ));
  }

  render() {
    const { person } = this.state;

    return (
      <div className="App">
        <form>
          <label>
            <div>Name</div>
            <input
              type="text"
              value={person.name}
              onChange={this.onChangeName}
            />
          </label>
          <label>
            <div>Occupation</div>
            <input
              type="text"
              value={person.occupation}
              onChange={this.onChangeOccupation}
            />
          </label>
        </form>
        <p>{person.name} works as a {person.occupation}.</p>
      </div>
    );
  }
}

export default App;
