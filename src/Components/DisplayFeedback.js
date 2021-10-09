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
    debugger;
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

      // mu={this.props.trialSgmMu[this.props.trialNum - 1][2]}
      // sgm={this.props.trialSgmMu[this.props.trialNum - 1][1]}
    // value={this.props.all_true_pop_size[this.props.trialNum - 1]}
    return (
      <div className={styles.cockpit}>
        <div>{text2}</div>
        <View style={styles.container}>
          <div className={styles.cockpit}>
            <OutcomeSliderBar
            mu={50}
            sgm={20}
              value={40}
              getBarHeight={this.handleHeight}
            />
          </div>
        </View>
      </div>
    );
  }
}
export default withRouter(DispFeedback);
