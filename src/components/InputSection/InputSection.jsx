import './InputSection.css';
import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import TextField from '@mui/material/TextField';

import { AutoTabProvider } from 'react-auto-tab';
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
      console.log(true)
      $(e.target).addClass('green');
    } else {
      console.log(false);
      $(e.target).removeClass('green');
    }
    console.log(tabindex + value);
  }

  createInputs(originalArr) {
    const arr = [];
    originalArr.map((letter, index) => {
      arr.push(
        <input
          autofocus="autofocus"
          type="text"
          className={letter === ' ' ? 'inputs yellow' : 'inputs grey'}
          tabIndex={index}
          key={index}
          size="5"
          maxLength={1}
          onKeyUp={(e) => this.autoTab(e)}
          onChange={(e) => this.handleInputChanged(e)}
          tabbable="true" />
      );
      if (letter === " ") {
        const newIndex = index * 100;
        arr.push(<div className="break" key={newIndex}><br /></div>)
      } return arr
    });

    return (
      <div className='inputContainer'>
        {arr}
      </div>
    )
  }


  render() {
    const { scambledStr, score, originalStr, originalArr } = this.props;
    return (
      <Card.Body>
        {this.createInputs(originalArr)}
      </Card.Body>
    )
  }
}