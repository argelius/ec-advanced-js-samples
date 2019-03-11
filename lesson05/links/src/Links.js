import React, { Component } from 'react';

const Links = (props) => {
  /**
   * With protocol
   */
  const re1 =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  /**
   * Without protocol
   */
  const re2 =
    /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  if (typeof props.children !== 'string') {
    throw new Error('Child must be a string');
  }

  const words = props.children
    .split(' ')
    .map((word) => {
      if (re1.test(word)) {
        return <a href={word}>{word}</a>
      }

      if (re2.test(word)) {
        return <a href={`http://${word}`}>{word}</a>
      }

      return word;
    })
    .map((word) => [word, ' ']);

  return <>{words}</>;

};

export default Links;
