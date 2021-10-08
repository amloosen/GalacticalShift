import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import Slider from "./MainSlider";

class DispSlider extends React.Component {
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
    let choiceTime0 = Math.round(performance.now());

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
        <Slider
          onSpacebarHit={(result) => {
            this.logData(result, choiceTime0);
          }}
        />
      </div>
    );
  }
}

export default withRouter(DispSlider);
