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
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
/////////////////////////////////////////////////////////////////////////////////

class TrainingTaskA extends React.Component {
  constructor(props) {
    super(props);

    var nr_train_a_trial = 10;
    // var val_options = range(0, 110, 10);
    // var val_tmp = val_options[~~(Math.random() * val_options.length)];
    var val_options = range(0, 110, 10);
    var random_val = [];
    for (var i = 0; i <= nr_train_a_trial - 1; i++) {
      var val_tmp = val_options[~~(Math.random() * val_options.length)];
      do {
        var val_tmp = val_options[~~(Math.random() * val_options.length)];
      } while (random_val[i - 1] === val_tmp); // make sure it changes color every time
      random_val[i] = val_tmp;
    }

    debugger;
    var corr_pos = [1, 2]; //1 is left and 2 is right
    shuffle(corr_pos);
    console.log(corr_pos);


    let trainAcc_tmp => Array(nr_train_a_trial).fill(0)

    this.state = {
      // userID: userID,
      // date: date,
      // startTime: startTime,
      // sectionTime: timeString,
      // taskSessionTry: 1,
      // taskSession: "TrainingTaskA",
      traintrialNum: 1, //adapt
      traintrialTotal: nr_train_a_trial,
      feedback: false,
      mounted: 0,
      rightCodeAns:[4,4,4,4,4,5,5,5,5],
      valTrainElem: val_tmp,
      trainAcc: trainAcc_tmp,
      ansOne: 20,
      ansTwo: random_val,
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
      case 37:
        //    this is left arrow
        pressed = 4;
        this.trainCheck(pressed, time_pressed);
        break;
      case 39:
        //    this is right arrow
        key_pressed = 5;
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
    var traintrialNum = this.state.traintrialNum+1;
    var trainScore = this.state.trainScore;
    var corAns = this.state.rightCodeAns[trialNum - 1];
    var trainAcc = this.state.trainAcc;

    if (pressed === corAns) {
      trialCor = 1;
      trainAcc[traintrialNum - 1] = 1;
      trainScore = trainScore + 1;
    } else {
      trialCor = 0;
      trainAcc[traintrialNum - 1] = 0;
    }

    this.setState({
      trialKeypress: pressed,
      trainScore: trainScore,
      traintrialNum: traintrialNum,
      trainAcc: trainAcc
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

export default withRouter(TrainingTaskA);
