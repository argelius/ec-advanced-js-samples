import React, { Component } from 'react';
import logo from './logo.svg';
import { addToastMessage, toastMessage$ } from './toast';
import Toast from './Toast';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <button onClick={() => addToastMessage('Pressed a button')}>Click me</button>
        <button onClick={() => addToastMessage('Pressed another button')}>Click me too</button>

        <Toast />
      </div>
    );
  }
}

export default App;
