import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";

class DisplayTrainFeedback extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.handleFeedback(1);
    },1000);
  }

  componentWillUnmount() {
    clearTimeout();
  }


  render() {
    let text2 = (
      <div className={styles.questions}>
        The true population on the planet was {this.props.corr_value} million.
        <br />
        <br />
        <br />
      </div>
    );


    return (
      <div className={styles.cockpit}>
        <div>{text2}</div>
      </div>
    );
  }

}
export default withRouter(DisplayTrainFeedback);
