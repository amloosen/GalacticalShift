import React from "react";
import { withRouter } from "react-router-dom";
import { DATABASE_URL } from "./config";
import styles from "./style/taskStyle.module.css";
import Slider from "./slider";
import OutcomeSlider from "./sliderOutcome";
import OutcomeSliderBar from "./sliderOutcomeBar";
import ElementsFullDisplay from "./elementsFulldisplay";
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
class TrainingTaskB extends React.Component {
  constructor(props) {
    super(props);

    let trialSgmMu = Array(9)
      .fill()
      .map(() => Array(3).fill(0));
    let trialRT = Array(9)
      .fill()
      .map(() => Array(3).fill(0));

    this.state = {
      // userID: userID,
      // date: date,
      // startTime: startTime,
      // sectionTime: timeString,
      // taskSessionTry: 1,
      // taskSession: "TrainingTaskB",
      trialNum: 1, //adapt
      trialRT: trialRT,
      choiceTime0: 0,
      trialTotal: 9, //adapt
      trialSgmMu: trialSgmMu,
      timerCountDur: 10,
      timePassed: false,
      feedback: false,
      mounted: 0,
      trueValue: 50,
      // trialTime: null,
      // trialScore: null,
      // valElem1: null,
      // valElem2: null,
      // valElem3: null,
      // colElem1: null,
      // colElem2: null,
      // colElem3: null
    };
    // this.displayFeedback = this.displayFeedback.bind(this)
    /* prevents page from going to the right/left when arrows are pressed .*/
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 37 && e.target === document.body) {
        e.preventDefault();
      } else if (e.keyCode === 39 && e.target === document.body) {
        e.preventDefault();
      }
    });
  }
  /////////////////////////////////////////////////////////////////////////////////
  // componentDidMount() {
  //     setTimeout(
  //       function() {
  //         this.setState({
  //           mounted: 1,
  //         });
  //       }
  //       .bind(this),
  //       5000
  //     );
  //   }
  //
  //   fetchUserInfo () {
  //        fetch(`${API_URL}/questions_behaviour/last_user_no`)
  //          .then(handleResponse)
  //          .then((data) => {
  //            const user_no_ = parseInt(data['new_user_no'])
  //            //console.log("fetchUserInfo in Intro ", "user_no", user_no_)
  //
  //            this.setState({
  //                    UserNo : user_no_,
  //                    fetched: 1,
  //                });
  //        })
  //          .catch((error) => {
  //           console.log(error)
  //        });
  //       }

  /////////////////////////////////////////////////////////////////////////////////
  render() {
    setTimeout(() => {
      this.setState({ timePassed: true });
    }, 10000); //show elements
    if (!this.state.timePassed) {
      return (
        <ElementsFullDisplay
          value1={30}
          value2={40}
          value3={80}
          trialTotal={this.state.trialTotal}
          trialNum={this.state.trialNum}
        />
      );
    } else {
      // if (this.state.timePassed===true && this.state.feedback===false){
      let choiceTime0 = Math.round(performance.now());

      let text = (
        <div className={styles.questions}>
          How large is the alien population?
          <br />
          <br />
          <br />
        </div>
      );

      let text2 = (
        <div className={styles.questions}>
          The true population on the planet was {50} mio.
          <br />
          <br />
          <br />
        </div>
      );

      return (
        <div>
          {" "}
          {this.state.feedback ? (
            <div className={styles.cockpit}>
              <div>{text2}</div>
              <div className={styles.overlaybar}>
                <OutcomeSliderBar
                  mu={this.state.trialSgmMu[this.state.trialNum - 1][2]}
                  sgm={this.state.trialSgmMu[this.state.trialNum - 1][1]}
                  value={this.state.trueValue}
                />
              </div>
              <div className={styles.overlaybar}>
                <OutcomeSlider
                  mu={this.state.trialSgmMu[this.state.trialNum - 1][2]}
                  sgm={this.state.trialSgmMu[this.state.trialNum - 1][1]}
                />
              </div>
            </div>
          ) : (
            <div className={styles.cockpit}>
              <div>{text}</div>
              <Slider
                onSpacebarHit={(result) => {
                  this.saveSgmMu(result, choiceTime0);
                }}
              />
            </div>
          )}
        </div>
      );
    }
  }
  /////////////////////////////////////////////////////////////////////////////////

  saveSgmMu(result, time) {
    let trialSgmMu = this.state.trialSgmMu;
    let trialRT = this.state.trialRT;
    let trialNum = this.state.trialNum;
    trialSgmMu[trialNum - 1][1] = result.sgm;
    trialSgmMu[trialNum - 1][2] = result.mu;
    trialRT[trialNum - 1][0] = trialNum;
    trialRT[trialNum - 1][1] = time;
    trialRT[trialNum - 1][2] = Math.round(performance.now());
    trialRT[trialNum - 1][3] = trialRT[trialNum - 1][2] - time;
    this.setState({
      trialSgmMu: trialSgmMu,
      trialRT: trialRT,
      feedback: true,
      // trialNum : trialNum+1,
      // outcome: show
    });
  }
}

export default withRouter(TrainingTaskB);
