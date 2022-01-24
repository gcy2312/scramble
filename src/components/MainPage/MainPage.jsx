import React, { Component } from 'react';
import './MainPage.css';
import axios from '../../axios';
import $ from 'jquery';
import Word from '../word/word';
import EndPage from '../EndPage/EndPage';
import InputSection from '../InputSection/InputSection';
import NextButton from '../NextButton/NextButton';
import Card from 'react-bootstrap/Card';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalStr: "",
      counter: 1,
      scrambledStr: "",
      score: 0,
      originalArr: [],
    };

    this.handler = this.handler.bind(this);

  }
  handler(newCounter, newScore) {
    this.setState({
      counter: newCounter,
      score: newScore
    });


    this.getPhrase();
    console.log(this.state.counter);

  }

  getPhrase() {
    let { counter, score } = this.state;
    axios
      .get(`/${counter}`, {})
      .then(res => {
        const data = res.data;
        const originalPhrase = data.data.sentence;
        //set state for original phrase
        this.setState({ originalStr: originalPhrase });

        //call function to scramble the phrase (state set in scramble function)
        this.scramblePhrase();
        //call function to get array of letters for original(setSate called in function)
        this.getPhraseArray();
      })
      .catch((error) => {
        console.log(error)
      })
  }
  getPhraseArray() {
    let original = this.state.originalStr;
    let array = original.split('');
    this.setState({ originalArr: array });
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
    //set state for jumbled phrase
    this.setState({ scrambledStr: newPhrase });
  }

  componentDidMount() {
    this.getPhrase();
    // this.getPhrase();
  }




  render() {
    return (
      <div className="MainPage">



        <Card style={{ width: '50rem' }}>

          <div>
            <Word
              scrambledStr={this.state.scrambledStr}
              originalStr={this.state.originalStr}
              score={this.state.score}>
            </Word>
            <InputSection
              scrambledStr={this.state.scrambledStr}
              originalStr={this.state.originalStr}
              score={this.state.score}
              originalArr={this.state.originalArr}
            >
            </InputSection>
            <NextButton
              score={this.state.score}
              counter={this.state.counter}
              handler={this.handler}
            ></NextButton>
          </div>



        </Card>


      </div>
    );
  }

}

