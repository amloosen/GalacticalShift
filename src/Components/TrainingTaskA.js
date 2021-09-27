import React from "react";
import { withRouter } from "react-router-dom";
import { DATABASE_URL } from "./config";
import styles from "./style/taskStyle.module.css";
import { ImageBackground, View, Image, StyleSheet, Text } from "react-native";
import { range } from "lodash";

import Slider from "./slider";
import OutcomeSlider from "./sliderOutcome";
import OutcomeSliderBar from "./sliderOutcomeBar";

import ElementsOneDisplay from "./elementsOnedisplay";
////////////////////////////////////////////////////////////////////////////////
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
/////////////////////////////////////////////////////////////////////////////////

class TrainingTaskA extends React.Component {
  constructor(props) {
    super(props);

    var nr_train_a_trial = 10;
    var val_options = range(0, 110, 10);
    // var idx_respoptions = range(1, 3, 1);
    // var random_val = val_options[~~(Math.random() * val_options.length)];
    var idx_corransw = idx_respoptions[~~(Math.random() * idx_respoptions.length)];

    var corr_pos = [1, 2];//1 is left and 2 is right
    shuffle(corr_pos);
    console.log(corr_pos );

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
      // taskSession: "TrainingTaskA",
      traintrialNum: 1, //adapt
      trialRT: trialRT,
      choiceTime0: 0,
      traintrialTotal: 9, //adapt
      trialSgmMu: trialSgmMu,
      timerCountDur: 10,
      timePassed: false,
      feedback: false,
      mounted: 0,
      // trialTime: null,
      // trialScore: null,
      valTrainElem: random_val,
      ansOne: 20,
      ansTwo: 10,
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
  handleAnswersLocal(key_pressed) {
    var curText = this.state.instructScreenText;
    var whichButton = key_pressed;

    if (whichButton === 4) {
      this.setState({ instructScreenText: curText - 1 });
    } else if (whichButton === 5) {
      this.setState({ instructScreenText: curText + 1 });
    }
}

_handleTrainKey = (event) => {
  var pressed;
  var time_pressed;

  switch (event.keyCode) {
    case 49:
      pressed = 1;
      time_pressed = Math.round(performance.now());
      this.trainCheck(pressed, time_pressed);
      break;
    case 50:
      pressed = 2;
      time_pressed = Math.round(performance.now());
      this.trainCheck(pressed, time_pressed);
      break;
    case 51:
      pressed = 3;
      time_pressed = Math.round(performance.now());
      this.trainCheck(pressed, time_pressed);
      break;
    //this is keycode for numpad
    case 97:
      pressed = 1;
      time_pressed = Math.round(performance.now());
      this.trainCheck(pressed, time_pressed);
      break;
    case 98:
      pressed = 2;
      time_pressed = Math.round(performance.now());
      this.trainCheck(pressed, time_pressed);
      break;
    case 99:
      pressed = 3;
      time_pressed = Math.round(performance.now());
      this.trainCheck(pressed, time_pressed);
      break;
    default:
  }
};
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
  trainCheck(pressed, time_pressed) {
    var traintrialNum = this.state.traintrialNum; //quiz question number (this needs to be rest to 1)
    var trialRT = time_pressed - this.state.trialTime;
    var corAns = this.state.outcomeAnsLog[traintrialNum - 1];
    var trialCorLog = this.state.trialCorLog; //[1,1,1,0...]
    var trialScore = this.state.trialScore; //sum of the correct answers
    var trialCor = this.state.trialCor;

    if (pressed === corAns) {
      trialCor = 1;
      trialCorLog[traintrialNum - 1] = 1;
      trialScore = trialScore + 1;
    } else {
      trialCor = 0;
      trialCorLog[traintrialNum - 1] = 0;
    }

    this.setState({
      trialKeypress: pressed,
      trialRT: trialRT,
      trialCor: trialCor,
      trialCorLog: trialCorLog,
      trialScore: trialScore,
    });

    setTimeout(
      function () {
        this.trialSave();
      }.bind(this),
      5
    );
  }

  /////////////////////////////////////////////////////////////////////////////////
  render() {
    setTimeout(() => {
      this.setState({ timePassed: true });
    }, 100); //show elements
    if (!this.state.timePassed) {
      return (
        <ElementsOneDisplay
          value={this.state.valTrainElem}
          traintrialTotal={this.state.traintrialTotal}
          traintrialNum={this.state.traintrialNum}
        />
      );
    } else {
    // if (this.state.timePassed===true && this.state.feedback===false){
      document.addEventListener("keyup", this._handleInstructKey);
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
            </div>
          ) : (
            <div className={styles.cockpit}>
              <div>{text}</div>
              <br />
              <div className={styles.main}>
                  <div className={styles.container_1}>
                    <span className={styles.right}>{this.state.ansTwo}</span>
                    <span className={styles.left}>{this.state.ansOne}</span>
                  </div>
                <br />
              </div>
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
    let traintrialNum = this.state.traintrialNum;
    trialSgmMu[traintrialNum - 1][1] = result.sgm;
    trialSgmMu[traintrialNum - 1][2] = result.mu;
    trialRT[traintrialNum - 1][0] = traintrialNum;
    trialRT[traintrialNum - 1][1] = time;
    trialRT[traintrialNum - 1][2] = Math.round(performance.now());
    trialRT[traintrialNum - 1][3] = trialRT[traintrialNum - 1][2] - time;
    this.setState({
      trialSgmMu: trialSgmMu,
      trialRT: trialRT,
      feedback: true,
      traintrialNum: traintrialNum + 1,
    });
  }
}

export default withRouter(TrainingTaskA);
