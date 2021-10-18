import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";

class DisplayBreak extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBreakKey = (event) => {
    if (event.keyCode === 32) {
      this.props.onBreakEnd(1);
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.onBreakEnd(1);
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
          You should take the opportunity to look away from the screen and <br />
          <br />focus on something in the distance for a few seconds.
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
export default withRouter(DisplayBreak);
