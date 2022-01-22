import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';

import './word.css';


export default class Word extends Component {

  render() {
    const { score, scrambledStr } = this.props;
    return (

      <Card.Body>
        <Card.Title id="title">
          {scrambledStr}
        </Card.Title>
        <Card.Text id="introText">
          Guess the sentence! Start typing.
        </Card.Text>
        <Card.Text id="introText">
          The yellow blocks are meant for spaces
        </Card.Text>
        <Card.Title id="scoreInfo">Score: {score}</Card.Title>
      </Card.Body>

    )
  }
}