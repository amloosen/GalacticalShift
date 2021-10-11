import React from "react";
import { withRouter } from "react-router-dom";
// import { DATABASE_URL } from "./config";
import styles from "./style/taskStyle.module.css";
import { range } from "lodash";

class TrainOptions extends React.Component {
  constructor(props) {
    super(props);
  }
  _handleTrainKey = (event) => {
    var pressed;
    switch (event.keyCode) {
      case 37:
        //    this is left arrow
        pressed = 4;
        this.props.trainIndic(pressed);
        break;
      case 39:
        //    this is right arrow
        pressed = 5;
        this.props.trainIndic(pressed);
        break;
      default:
    }
  };

  componentDidMount() {
    document.addEventListener("keyup", this._handleTrainKey);
  }
  //
  componentWillUnmount() {
    document.removeEventListener("keyup", this._handleTrainKey);
  }


  render() {
    let text = (
      <div className={styles.questions}>
        How large is the alien population?
        <br />
        <br />
        <br />
      </div>
    );
    return (
      <div className={styles.cockpit}>
        <div>{text}</div>
        <br />
        <div className={styles.main}>
          <div className={styles.container_1}>
            <span className={styles.right}>{this.props.ansTwo}</span>
            <span className={styles.left}>{this.props.ansOne}</span>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default withRouter(TrainOptions);
