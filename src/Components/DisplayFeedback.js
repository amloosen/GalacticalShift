import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import { View } from "react-native";
import OutcomeSlider from "./SliderOutcome";
import OutcomeSliderBar from "./SliderOutcomeBar";

class DispFeedback extends React.Component {
  constructor(props) {
    super(props);
  }

  handleHeight = (barHeight) => {
    this.props.onFeedbackEnd(barHeight);
  };

  render() {
    let text2 = (
      <div className={styles.questions}>
        The true population on the planet was{" "}
        {this.props.all_true_pop_size[this.props.trialNum - 1]} million.
        <br />
        <br />
        <br />
      </div>
    );

    return (
      <div className={styles.cockpit}>
        <div>{text2}</div>
        <div>
            <OutcomeSliderBar
              mu={this.props.trialSgmMu[this.props.trialNum - 1][2]}
              sgm={this.props.trialSgmMu[this.props.trialNum - 1][1]}
              value={this.props.all_true_pop_size[this.props.trialNum - 1]}
              getBarHeight={this.handleHeight}
              />
            </div>
          </div>
    );
  }
}
export default withRouter(DispFeedback);
