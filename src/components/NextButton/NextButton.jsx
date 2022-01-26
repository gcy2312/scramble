import React, { Component } from "react";
import './NextButton.css';

class NextButton extends Component {

  handleClick = (counter, score) => {
    const newCounter = counter + 1;
    const newScore = score + 1;
    this.props.handler(newCounter, newScore);
  }

  render() {
    const { counter, score } = this.props;
    return (
      <div id="btnContainer">
        <button id="nextBtn" value="Submit" onClick={() => this.handleClick(counter, score)}>Next</button>
      </div>
    )
  }
}

export default NextButton