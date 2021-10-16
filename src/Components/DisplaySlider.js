import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import { StyleSheet, View } from "react-native";
import Slider from "./MainSlider";

class DisplaySlider extends React.Component {
  constructor(props) {
    super(props);
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
      }
      if (e.keyCode === 39 && e.target === document.body) {
        e.preventDefault();
      }
      if (e.keyCode === 37 && e.target === document.body) {
        e.preventDefault();
      }
    });
  }

  logData = (result, distHeight,time) => {
    let trialSgmMu = this.props.trialSgmMu;
    let trialRT = this.props.trialRT;
    let trialNum = this.props.trialNum;
    trialSgmMu[trialNum - 1][1] = result.sgm;
    trialSgmMu[trialNum - 1][2] = result.mu;
    trialRT[trialNum - 1][0] = trialNum;
    trialRT[trialNum - 1][1] = time;
    trialRT[trialNum - 1][2] = Math.round(performance.now());
    trialRT[trialNum - 1][3] = trialRT[trialNum - 1][2] - time;
    this.props.onSliderEnd(trialSgmMu, trialRT, distHeight);
  };

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
      <div className={styles.cockpitslider}>
          <View style={stylesNew.header}>
            <span className={styles.slidertext}>
              <div>{text}</div>
            </span>
          </View>
          <span className={styles.slider}>
            <Slider
              mu={this.props.startMu}
              sgm={this.props.startSgm}
              onSpacebarHit={this.logData}
            />
          </span>
      </div>
    );
  }
}

export default withRouter(DisplaySlider);

const stylesNew = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    position: "absolute",
  }
});
