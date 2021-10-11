import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import Slider from "./MainSlider";

class DisplaySliderTrainer extends React.Component {
  constructor(props) {
    super(props);
  }

  logData = (result, time) => {
    let trialSgmMu = this.props.trialSgmMu;
    let trialRT = this.props.trialRT;
    let trialNum = this.props.trialNum;
    trialSgmMu[trialNum - 1][1] = result.sgm;
    trialSgmMu[trialNum - 1][2] = result.mu;
    trialRT[trialNum - 1][0] = trialNum;
    trialRT[trialNum - 1][1] = time;
    trialRT[trialNum - 1][2] = Math.round(performance.now());
    trialRT[trialNum - 1][3] = trialRT[trialNum - 1][2] - time;
    this.props.onSliderEnd(trialSgmMu, trialRT);
  };

  render() {
    if (this.props.practNum === 1) {
      var text = (
        <div className={styles.questions}>
          Please indicate the number 65 with high certainty. <br />
          <br />
          <br />
        </div>
      );
    } else if (this.props.practNum === 2) {
      var text = (
        <div className={styles.questions}>
          Please indicate the number 65 with high UNcertainty. <br />
          <br />
          <br />
        </div>
      );
    } else if (this.props.practNum === 3) {
      var text = (
        <div className={styles.questions}>
          Please indicate the number 25 with high certainty. <br />
          <br />
          <br />
        </div>
      );
    } else if (this.props.practNum === 4) {
      var text = (
        <div className={styles.questions}>
          Please indicate the number 25 with high UNcertainty. <br />
          <br />
          <br />
        </div>
      );
    } else if (this.props.practNum === 5) {
      var text = (
        <div className={styles.questions}>
          What is your age ? (If the scale refers to 0 - 100). <br />
          <br />
          <br />
        </div>
      );
    } else if (this.props.practNum === 6) {
      var text = (
        <div className={styles.questions}>
          What is the population of Connecticut ?
          <br />
          (If the scale refers to 0 - 100 Million). <br />
          <br />
        </div>
      );
    } else if (this.props.practNum === 7) {
      var text = (
        <div className={styles.questions}>
          What is the population of New York City <br />
          (If the scale refers to 0 - 100 Million). <br />
          <br />
        </div>
      );
    }

    return (
      <div className={styles.cockpit}>
        <div>{text}</div>
        <Slider
          mu={this.props.startMu}
          sgm={this.props.startSgm}
          onSpacebarHit={this.logData}
        />
      </div>
    );
  }
}

export default withRouter(DisplaySliderTrainer);
