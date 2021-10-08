import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import ElementsFullDisplay from "./ElementsFulldisplay";
import ElementsIndicator from "./ElementsIndicator";

class DispFeedback extends React.Component {
  constructor(props) {
    super(props);
  }

  disp_feedback() {
    let text2 = (
      <div className={styles.questions}>
        The true population on the planet was{" "}
        {this.state.all_true_pop_size[this.state.trialNum - 1]} million.
        <br />
        <br />
        <br />
      </div>
    );

    setTimeout(() => {
      this.setState({ timePassed2: true, timePassed: false });
    }, 700);

    return (
      <div className={styles.cockpit}>
        <div>{text2}</div>
        <View style={styles.container}>
          <div className={styles.overlaybar}>
            <OutcomeSlider
              mu={this.state.trialSgmMu[this.state.trialNum - 1][2]}
              sgm={this.state.trialSgmMu[this.state.trialNum - 1][1]}
            />
          </div>
          <div className={styles.overlaybar}>
            <OutcomeSliderBar
              mu={this.state.trialSgmMu[this.state.trialNum - 1][2]}
              sgm={this.state.trialSgmMu[this.state.trialNum - 1][1]}
              value={this.state.all_true_pop_size[this.state.trialNum - 1]}
            />
          </div>
        </View>
      </div>
    );
  }
}
export default withRouter(DispFeedback);
