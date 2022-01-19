import React, { Component } from 'react';

import axios from '../../axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './word.css';


export default class Word extends Component {

  constructor(props) {
    super(props);
    this.state = {
      originalStr: "",
      counter: "1",
      scrambledStr: "",
      score: "0",
    };
  }

  getPhrase() {
    let counter = this.state.counter;
    axios
      .get(`/${counter}`, {})
      .then(res => {
        const data = res.data;
        const originalPhrase = data.data.sentence;
        this.setState({ originalStr: originalPhrase });

        console.log(originalPhrase);

        this.scramblePhrase(this.state.sentence);
        const phraseArr = this.state.originalStr.split('');
        console.log(phraseArr);
        console.log(this.state.scrambledStr);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  scramblePhrase() {
    let original = this.state.originalStr;
    const splitStr = original.split(" ");
    const mixEachWord = splitStr.map(e => {
      if (e.length <= 2) {
        return e
      } else {
        const firstLetter = e[0];
        const lastLetter = e[e.length - 1];
        const lettersToMix = e.substring(1, e.length - 1);
        const mixedLetters = lettersToMix.split('').sort(function () { return 0.3 - Math.random() }).join('');
        const newWord = firstLetter + mixedLetters + lastLetter;
        return newWord
      }
    });
    const newPhrase = mixEachWord.join(' ');
    this.setState({ scrambledStr: newPhrase });
  }

  // getLettersToMix(str) {
  //   // add a space to the end of the string
  //   str += " ";
  //   var res = "",
  //     w = "";
  //   // traverse the string and extract words
  //   for (var i = 0; i < str.length; i++) {
  //     if (str[i] === " ") {
  //       // excluding the first and
  //       // last character
  //       res += w.substring(1, w.length - 1);
  //       // clear the word
  //       w = "";
  //     } else {
  //       // else add the character to word
  //       w += str[i];
  //     }
  //   }
  //   return res;
  // }

  componentDidMount() {
    this.getPhrase();
  }

  render() {
    return (
      <Card style={{ width: '50rem' }}>
        <Card.Body>
          <Card.Title id="title">
            {this.state.scrambledStr}
          </Card.Title>
          <Card.Text id="introText">
            Guess the sentence! Start typing.
          </Card.Text>
          <Card.Text id="introText">
            The yellow blocks are meant for spaces
          </Card.Text>
          <Card.Title id="scoreInfo">Score: {this.state.score}</Card.Title>
        </Card.Body>


      </Card>
    )
  }
}