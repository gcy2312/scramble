import './InputSection.css';
import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import $ from 'jquery';




export default class InputSection extends Component {


  autoTab = e => {
    const BACKSPACE_KEY = 8;
    const DELETE_KEY = 46;
    let tabindex = $(e.target).attr("tabindex") || 0;
    tabindex = Number(tabindex);
    if (e.keyCode === BACKSPACE_KEY) {
      tabindex -= 1;
    } else if (e.keyCode !== DELETE_KEY) {
      tabindex += 1;
    }
    const elem = $("[tabindex=" + tabindex + "]");
    if (elem[0]) {
      elem.focus();
    }
  };

  handleInputChanged(e) {
    let tabindex = $(e.target).attr("tabindex") || 0;
    let value = e.target.value.toLowerCase();
    let letter = this.props.originalArr[tabindex].toLowerCase();
    if (letter === value) {

      $(e.target).addClass('green');
    } else {

      $(e.target).removeClass('green');
    }

    this.finishedAnswer();
  }

  focus = () => {
    const firstInput = $("[tabindex=" + 0 + "]");
    firstInput.focus();
  }

  createInputs(originalArr, score) {
    const arr = [];

    originalArr.map((letter, index) => {
      arr.push(
        <input
          type="text"
          className={letter === ' ' ? 'inputs yellow' : 'inputs grey'}
          tabIndex={index}
          key={index}
          size="5"
          maxLength={1}
          onKeyUp={(e) => this.autoTab(e)}
          onChange={(e) => this.handleInputChanged(e)}
          tabbable="true"
          ref={() => this.focus()}
        />
      );
      if (letter === " ") {
        const newIndex = index * 100;
        arr.push(<div className="break" key={newIndex}><br /></div>)
      } return arr
    });

    return (
      <div key={score} id='inputContainer' >
        {arr}
      </div>
    )
  }

  finishedAnswer() {
    var allHaveClass = $('#inputContainer input').length == $('#inputContainer input.green').length;
    if (allHaveClass === true) {
      const userAnswer = true;
      this.props.correct(userAnswer);
    }
  }


  render() {
    const { score, originalArr } = this.props;
    return (
      <Card.Body>
        {this.createInputs(originalArr, score)}
      </Card.Body>
    )
  }
}