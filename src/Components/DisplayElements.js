import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import ElementsFullDisplay from "./ElementsFulldisplay";
import ElementsIndicator from "./ElementsIndicator";

class DispElements extends React.Component {
  constructor(props) {
    super(props);
  }
  
  handleIndicKey = (event) => {
    var pressed;
    switch (event.keyCode) {
      case 49:
        pressed = 1;
        // this.nextTrial(1, pressed);
        break;
      case 50:
        pressed = 2;
        // this.nextTrial(1, pressed);
        break;
      case 51:
        pressed = 3;
        // this.nextTrial(1, pressed);
        break;
      default:
    }
  };

  handleTimes = (times_element1,times_element2,times_element3) => {
    this.props.onElementsEnd(times_element1,times_element2,times_element3);
  };

  componentDidMount() {
    if (this.props.indicReq[this.props.trialNum - 1] === 1) {
      document.addEventListener("keyup", this._handleIndicKey);
    }
  }

  componentWillUnmount() {
    if (this.props.indicReq[this.props.trialNum - 1] === 1) {
      document.removeEventListener("keyup", this._handleIndicKey);
    }
  }

  render() {
    if (this.props.indicReq[this.props.trialNum - 1] === 1) {
      return (
        <div className={styles.overlaybar}>
          <ElementsIndicator
            img1={this.props.element1Col}
            img2={this.props.element2Col}
            img3={this.props.element3Col}
            trialNum={this.props.trialNum}
            onKeyPressed={this.handleIndicKey}
          />
        </div>
      );
    } else {
      return (
        <div className={styles.overlaybar}>
          <ElementsFullDisplay
            value1={this.props.all_element_values[this.props.trialNum - 1][0]}
            value2={this.props.all_element_values[this.props.trialNum - 1][1]}
            value3={this.props.all_element_values[this.props.trialNum - 1][2]}
            img1={this.props.element1Col}
            img2={this.props.element2Col}
            img3={this.props.element3Col}
            trialNum={this.props.trialNum}
            onViewEnd={this.handleTimes}
          />
        </div>
      );
    }
  }
}
export default withRouter(DispElements);
