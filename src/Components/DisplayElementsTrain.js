import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import ElementsFullDisplayTwo from "./ElementsFullDisplayTwo";

class DisplayElementsTrain extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.onElementsEnd(1);
    },5000);
  }

  componentWillUnmount() {
    clearTimeout();
  }

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
