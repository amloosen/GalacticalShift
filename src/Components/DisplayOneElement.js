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
        cover={this.props.imgElement[3]}
        imgElement={this.props.imgElement[4]}
      />
    );
  }

}
export default withRouter(DisplayTrainElement);
