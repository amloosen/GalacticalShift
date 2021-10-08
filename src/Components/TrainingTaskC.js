import React from "react";
import { withRouter } from "react-router-dom";
// import { DATABASE_URL } from "./config";
import styles from "./style/taskStyle.module.css";
import Slider from "./slider";
import { View } from "react-native";
import OutcomeSlider from "./sliderOutcome";
import OutcomeSliderBar from "./sliderOutcomeBar";
import ElementsFullDisplayTraining from "./elementsFulldisplayTraining";
import { range } from "lodash";
////////////////////////////////////////////////////////////////////////////////
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
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

function getRand(array) {
  var val_options = range(0, 110, 10);
  var rand = val_options[~~(Math.random() * val_options.length)];
  // var rand = Math.floor(Math.random() * 10);
  if (array.indexOf(rand) === -1) {
    return rand;
  } else {
    return getRand(array);
  }
}
/////////////////////////////////////////////////////////////////////////////////
class TrainingTaskC extends React.Component {
  constructor(props) {
    super(props);

    let nr_train_a_trial = 10; //update later
    var val_options = range(0, 110, 10);
    val_options.splice(val_options.indexOf(50), 1); //remove the 50 to make it clearer which element is correct
    var random_val = [];
    for (var i = 0; i <= nr_train_a_trial - 1; i++) {
      var val_tmp = val_options[~~(Math.random() * val_options.length)];
      do {
        var val_tmp = val_options[~~(Math.random() * val_options.length)];
      } while (random_val[i - 1] === val_tmp); // make sure it changes every time
      random_val[i] = val_tmp;
    }

    var corr_values = random_val.slice(0, 6);
    var inverse_tmp = random_val.slice(6, 12);
    var inverse = inverse_tmp.map(function (value) {
      return 100 - value;
    });
    corr_values.push(
      inverse[0],
      inverse[1],
      inverse[2],
      inverse[3],
      inverse[4],
      inverse[5]
    );
    let array_tmp = Array(nr_train_a_trial).fill(0);

    var corr_elem_tmp = [1, 2, 3]; // from left to right
    shuffle(corr_elem_tmp);
    var corr_elem = Array(nr_train_a_trial).fill(0);

    for (var i = 0; i <= nr_train_a_trial - 1; i++) {
      if (i < nr_train_a_trial / 3) {
        corr_elem[i] = corr_elem_tmp[0];
      } else if (i >= nr_train_a_trial / 3 && i < (nr_train_a_trial / 3) * 2) {
        corr_elem[i] = corr_elem_tmp[1];
      } else {
        corr_elem[i] = corr_elem_tmp[2];
      }
    }
    //pregenerate the values for all elements
    var check_al2 = [];
    var check_al1 = [];

    for (var i = 0; i <= nr_train_a_trial - 1; i++) {
      var restricted = [corr_values[i], 100 - corr_values[i]];
      if (i < nr_train_a_trial / 2) {
        check_al1[i] = getRand(restricted);
        check_al2[i] = 100 - corr_values[i];
      } else {
        check_al1[i] = 100 - corr_values[i];
        check_al2[i] = getRand(restricted);
      }
    }

    var all_element_values = Array(nr_train_a_trial)
      .fill()
      .map(() => Array(3).fill(0));

    for (var i = 0; i <= nr_train_a_trial - 1; i++) {
      all_element_values[i][corr_elem[i] - 1] = corr_values[i];
      if (corr_elem[i] === 1) {
        all_element_values[i][1] = check_al1[i];
        all_element_values[i][2] = check_al2[i];
      } else if (corr_elem[i] === 2) {
        all_element_values[i][0] = check_al1[i];
        all_element_values[i][2] = check_al2[i];
      } else if (corr_elem[i] === 3) {
        all_element_values[i][0] = check_al1[i];
        all_element_values[i][1] = check_al2[i];
      }
    }

    let trialSgmMu = Array(nr_train_a_trial)
      .fill()
      .map(() => Array(3).fill(0));
    let trialRT = Array(nr_train_a_trial)
      .fill()
      .map(() => Array(3).fill(0));

    this.state = {
      // userID: userID,
      // date: date,
      // startTime: startTime,
      // sectionTime: timeString,
      // taskSessionTry: 1,
      // taskSession: "TrainingTaskC",
      traintrialNum: 1,
      trialRT: trialRT,
      choiceTime0: 0,
      // //
      // trialSliderRT: null,
      trialSgmMu: trialSgmMu,
      timerCountDur: 10,
      feedback: false,
      mounted: 0,
      traintrialTotal: nr_train_a_trial,
      timePassed: false,
      timePassed2: false,
      all_corr_values: corr_values,
      trainAcc: array_tmp,
      corr_elem: corr_elem,
      all_element_values: all_element_values,
      times_element1: Array(nr_train_a_trial).fill(0),
      times_element2: Array(nr_train_a_trial).fill(0),
      times_element3: Array(nr_train_a_trial).fill(0),
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
  nextTrial() {
    if (this.state.traintrialNum === this.state.traintrialTotal) {
      this.redirectToNextStage();
    } else {
      var traintrialNum_tmp = this.state.traintrialNum + 1;
      this.setState({
        traintrialNum: traintrialNum_tmp,
        feedback: false,
        timePassed: false,
        timePassed2: false,
      });
    }
  }
  componentDidMount() {
    setTimeout(
      function () {
        this.setState({
          mounted: 1,
        });
      }.bind(this),
      5000
    );
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
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
    if (!this.state.timePassed && this.state.feedback === false) {
      return <div className={styles.cockpit}>{this.disp_elements()}</div>;
    } else if (this.state.feedback === true && !this.state.timePassed2) {
      return (
        <div className={styles.cockpit}>
          {this.disp_feedback()} {this.handleIncrement}{" "}
        </div>
      );
    } else if (!this.state.feedback && this.state.timePassed2 === false) {
      return <div className={styles.cockpit}>{this.disp_slider()}</div>;
    } else if (
      this.state.timePassed2 === true &&
      this.state.feedback === true
    ) {
      {
        this.nextTrial();
      }
      return null;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  disp_slider() {
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
            this.saveSgmMu(result, choiceTime0);
          }}
        />
      </div>
    );
  }

  disp_elements() {
    setTimeout(() => {
      this.setState({ timePassed: true, timePassed2: false });
    }, 5000);

    return (
      <div className={styles.overlaybar}>
        <ElementsFullDisplayTraining
          value1={
            this.state.all_element_values[this.state.traintrialNum - 1][0]
          }
          value2={
            this.state.all_element_values[this.state.traintrialNum - 1][1]
          }
          value3={
            this.state.all_element_values[this.state.traintrialNum - 1][2]
          }
          corr_elem={this.state.corr_elem[this.state.traintrialNum - 1]}

        />
      </div>
    );
  }

  disp_feedback() {
    let text2 = (
      <div className={styles.questions}>
        The true population on the planet was{" "}
        {this.state.all_corr_values[this.state.traintrialNum - 1]} million.
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
              mu={this.state.trialSgmMu[this.state.traintrialNum - 1][2]}
              sgm={this.state.trialSgmMu[this.state.traintrialNum - 1][1]}
            />
          </div>
          <div className={styles.overlaybar}>
            <OutcomeSliderBar
              mu={this.state.trialSgmMu[this.state.traintrialNum - 1][2]}
              sgm={this.state.trialSgmMu[this.state.traintrialNum - 1][1]}
              value={this.state.all_corr_values[this.state.traintrialNum - 1]}
            />
          </div>
        </View>
      </div>
    );
  }

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
      //traintrialNum : traintrialNum+1,
      // outcome: show
    });
  }

  redirectToNextStage() {
    this.props.history.push({
      pathname: `/MainTaskIntro`,
      state: {
        // userID: this.state.userID,
        // date: this.state.date,
        // startTime: this.state.startTime,
      },
    });

    // console.log("UserID is: " + this.state.userID);
  }
}

export default withRouter(TrainingTaskC);
