import React, { Component } from "react";
import './EndPage.css';
import Card from 'react-bootstrap/Card';
class EndPage extends Component {


  render() {

    return (
      <div id="endCardContainer">
        <Card id="endCard">
          <Card.Text>You win!</Card.Text>
        </Card>
      </div>
    )
  }

}
export default EndPage