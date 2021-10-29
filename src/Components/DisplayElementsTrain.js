import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import ElementsFullDisplayTwo from "./ElementsFullDisplayTwo";

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 32;

class DisplayElementsTrain extends React.Component {
  constructor(props) {
    super(props);
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
      }
      if (e.keyCode === 39 && e.target === document.body) {
        e.preventDefault();
      }
      if (e.keyCode === 37 && e.target === document.body) {
        e.preventDefault();
      }
    });
  }

  componentDidMount() {
    this.timerkeyHandle = setTimeout(() => {
      document.addEventListener("keydown", this.handleKeyDown);
      this.timerkeyHandle = 0;
    }, 3000);

    this.timerHandle = setTimeout(() => {
      this.props.onElementsEnd(1);
      this.timerHandle = 0;
    }, 2000);
  }

  componentWillUnmount() {
    if (this.timerkeyHandle) {
      // Yes, clear it
      clearTimeout(this.timerkeyHandle);
      this.timerkeyHandle = 0;
    }
    if (this.timerHandle) {
      // Yes, clear it
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      this.props.onElementsEnd(1);
    }
  };

  render() {
    return (
      <ElementsFullDisplayTwo
        value1={this.props.all_element_values[this.props.trialNum - 1][0]}
        value2={this.props.all_element_values[this.props.trialNum - 1][1]}
        img1={this.props.element1Col}
        img2={this.props.element2Col}
        onViewEnd={this.handleTimes}
      />
    );
  }
}
export default withRouter(DisplayElementsTrain);
