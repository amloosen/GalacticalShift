import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import ElementsOneDisplay from "./ElementsOneDisplay";

class DisplayTrainElement extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.handleElement(1);
    },2000);
  }

  componentWillUnmount() {
    clearTimeout();
  }


  render() {
    return (
      <ElementsOneDisplay
        value={this.props.valTrainElem}
        traintrialTotal={this.props.traintrialTotal}
        traintrialNum={this.props.traintrialNum}
        blue={this.props.blue}
      />
    );
  }

}
export default withRouter(DisplayTrainElement);
