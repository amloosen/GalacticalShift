import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";

class DispBreak extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBreakKey = (event) => {
    if (event.keyCode === 32) {
      this.props.handleBreak(1);
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.handleBreak(1);
    }, 60000); // if space not pressed timeout after a minute
    document.addEventListener("keyup", this.handleBreakKey);
  }

  componentWillUnmount() {
    clearTimeout();
    document.removeEventListener("keyup", this.handleBreakKey);
  }
  render() {
    let text = (
      <div className={styles.main}>
        <p>
          <span className={styles.center}>BREAK</span>
          <br />
          <br />
          You have completed {this.props.blockNum} out of&nbsp;
          {this.props.blockTotal} blocks!
          <br />
          <br />
          You may take a short break.
          <br />
          <br />
          You should take the opportunity to refresh your memory of the room and
          outcome images.
          <br />
          <br />
          <span className={styles.centerTwo}>
            If you are ready to continue, please press the [
            <strong>SPACEBAR</strong>].
          </span>
        </p>
      </div>
    );

    return (
      <div className={styles.cockpit}>
        <div className={styles.textblock}>
          {text} {this.handleBreakKey}
        </div>
      </div>
    );
  }
}
export default withRouter(DispBreak);
