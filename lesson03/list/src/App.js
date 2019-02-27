import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class List extends Component {
  render() {
    return <ul className="List">{this.props.children}</ul>;
  }
}

class ListItem extends Component {
  render() {
    return <li className="ListItem">{this.props.children}</li>;
  }
}

class App extends Component {
  render() {
    return (
      <>
        <List>
          <ListItem>Mercury</ListItem>
          <ListItem>Venus</ListItem>
          <ListItem>Earth</ListItem>
          <ListItem>Mars</ListItem>
          <ListItem>Jupiter</ListItem>
          <ListItem>Saturn</ListItem>
          <ListItem>Uranus</ListItem>
          <ListItem>Neptune</ListItem>
          <ListItem>Pluto</ListItem>
        </List>
      </>
    );
  }
}

export default App;
