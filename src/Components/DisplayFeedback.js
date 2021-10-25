import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import { StyleSheet, View } from "react-native-web";
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
      <div className={styles.cockpitslider}>
          <View style={stylesSliderRep.header}>
            <span className={styles.slidertext}>
              <div>{text2}</div>
            </span>
          </View>

          <span className={styles.slider}>
          <OutcomeSliderBar
                mu={this.props.trialSgmMu[this.props.trialNum - 1][2]}
                sgm={this.props.trialSgmMu[this.props.trialNum - 1][1]}
                value={this.props.all_true_pop_size[this.props.trialNum - 1]}
                distHeight={this.props.distHeight}
                getBarHeight={this.handleHeight}
              />
          </span>
      </div>
    );
  }
}
export default withRouter(DispFeedback);

const stylesSliderRep= StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    position: "absolute",
  }
});
