import './InputSection.css';
import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { AutoTabProvider } from 'react-auto-tab';
import $ from 'jquery';

const autoTab = e => {
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


export default class InputSection extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleInputChanged(e) {
    let tabindex = $(e.target).attr("tabindex") || 0;
    const originalArr = this.props.originalArr;
    console.log(tabindex + e.target.value);
    if (e.target.value === " ") {
      e.target.classList.add('space-state');
    }
  }


  createInputs(originalArr) {
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
          onKeyUp={autoTab}
          onChange={(e) => this.handleInputChanged(e)}
          tabbable="true" />
      );
      if (letter === " ") {
        const newIndex = index * 100;
        arr.push(<div className="break"><br id="break" key={newIndex} /></div>)
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