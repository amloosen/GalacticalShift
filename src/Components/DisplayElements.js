import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import ElementsFullDisplay from "./ElementsFulldisplay";
import ElementsIndicator from "./ElementsIndicator";

import Blue from "./img/stimuli3_blue.jpg";
import Red from "./img/stimuli3_red.jpg";
// import Green from "./img/stimuli3_green.jpg";
import Yellow from "./img/stimuli3_yellow.jpg";

class DisplayElements extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.img1 === 1) {
      var img1 = Blue;
      if (this.props.img2 === 2) {
        var img2 = Red;
        var img3 = Yellow;
      } else if (this.props.img2 === 3) {
        var img2 = Yellow;
        var img3 = Red;
      }
    } else if (this.props.img1 === 2) {
      var img1 = Red;

      if (this.props.img2 === 3) {
        var img2 = Yellow;
        var img3 = Blue;
      } else if (this.props.img2 === 1) {
        var img2 = Blue;
        var img3 = Yellow;
      }
    } else if (this.props.img1 === 3) {
      var img1 = Yellow;

      if (this.props.img2 === 1) {
        var img2 = Blue;
        var img3 = Red;
      } else if (this.props.img2 === 2) {
        var img2 = Red;
        var img3 = Blue;
      }
    }
  this.state = {
    img1: img1,
    img2: img2,
    img3: img3,
  };
  }


  handleIndicKey = (event) => {
    var pressed;
    switch (event.keyCode) {
      case 49:
        pressed = 1;
        this.props.onElementsIndic(pressed);
        break;
      case 50:
        pressed = 2;
        this.props.onElementsIndic(pressed);
        break;
      case 51:
        pressed = 3;
        this.props.onElementsIndic(pressed);
        break;
      default:
    }
  };

  handleTimes = (times_element1, times_element2, times_element3) => {
    this.props.onElementsEnd(times_element1, times_element2, times_element3);
  };

  componentDidMount() {
    if (this.props.indicReq[this.props.trialNum - 1] === 1) {
      document.addEventListener("keyup", this.handleIndicKey);
    }
  }

  componentWillUnmount() {
    if (this.props.indicReq[this.props.trialNum - 1] === 1) {
      document.removeEventListener("keyup", this.handleIndicKey);
    }
  }

  render() {
    if (this.props.indicReq[this.props.trialNum - 1] === 1) {
      return (
          <ElementsIndicator
            img1={this.props.img1}
            img2={this.props.img2}
            img3={this.props.img3}
            trialNum={this.props.trialNum}
            onKeyPressed={this.handleIndicKey}
          />
      );
    } else {
      return (
          <ElementsFullDisplay
            value1={this.props.all_element_values[this.props.trialNum - 1][0]}
            value2={this.props.all_element_values[this.props.trialNum - 1][1]}
            value3={this.props.all_element_values[this.props.trialNum - 1][2]}
            img1={this.props.img1}
            img2={this.props.img2}
            img3={this.props.img3}
            trialNum={this.props.trialNum}
            onViewEnd={this.handleTimes}
          />
      );
    }
  }
}
export default withRouter(DisplayElements);
