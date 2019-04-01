import React, { Component } from 'react';
import { toastMessages$ } from './toast';
import "./Toast.css"

class Toast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    this.subscription = toastMessages$.subscribe((messages) => {
      this.setState({ messages });
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    const { messages } = this.state;

    return (
      <ul className="Toast">
        {messages.map((message) => (
          <li className="Toast-message" key={message.id}>{message.message}</li>
        ))}
      </ul>
    );
  }
}

export default Toast;
