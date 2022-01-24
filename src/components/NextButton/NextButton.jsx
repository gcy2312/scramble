import React, { Component } from "react";
class NextButton extends Component {

  handleClick = (counter, score) => {
    const newCounter = counter + 1;
    const newScore = score + 1;

    this.props.handler(newCounter, newScore);

  }
  render() {
    const { counter, score } = this.props;
    return (
      <button onClick={() => this.handleClick(counter, score)}>hello</button>

    )
  }

}
export default NextButton