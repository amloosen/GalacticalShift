import React from "react";
import { withRouter } from "react-router-dom";
import { DATABASE_URL } from "./config";
import styles from "./style/taskStyle.module.css";
import Slider from "./slider";
/////////////////////////////////////////////////////////////////////////////////
class SliderPractice extends React.Component {
  constructor(props) {
    super(props);

    let practSgmMu = Array(7)
      .fill()
      .map(() => Array(3).fill(0));
    let practRT = Array(7)
      .fill()
      .map(() => Array(3).fill(0));

    this.state = {
      // userID: userID,
      // date: date,
      // startTime: startTime,
      // sectionTime: timeString,
      taskSession: "SliderPractice",
      practTotal: 7,
      practNum: 1, //adapt
      practRT: practRT,
      choiceTime0: 0,
      practSgmMu: practSgmMu,
      timerCountDur: 10,
      timePassed: false,
      mounted: 0,
      trueValue: 50,
    };
    this.redirectToNextStage = this.redirectToNextStage.bind(this);

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
  // fix Warning: Can't perform a React state update on an unmounted component
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
    if (this.state.practNum <= this.state.practTotal) {
      let choiceTime0 = Math.round(performance.now());
      return (
        <div className={styles.cockpit}>
          <div> {this.quest_text(this.state.practNum)} </div>{" "}
          <Slider
            onSpacebarHit={(result) => {
              this.saveSgmMu(result, choiceTime0)
            }}
          />{" "}
        </div>
      );
    } else {
      this.redirectToNextStage();
    }
  }
  /////////////////////////////////////////////////////////////////////////////////
  saveSgmMu(result, time) {
    let practSgmMu = this.state.practSgmMu;
    let practRT = this.state.practRT;
    let practNum = this.state.practNum;
    practSgmMu[practNum - 1][1] = result.sgm;
    practSgmMu[practNum - 1][2] = result.mu;
    practRT[practNum - 1][0] = practNum;
    practRT[practNum - 1][1] = time;
    practRT[practNum - 1][2] = Math.round(performance.now());
    practRT[practNum - 1][3] = practRT[practNum - 1][2] - time;
    this.setState({
      practSgmMu: practSgmMu,
      practRT: practRT,
      practNum: practNum + 1,
    });
  }

  quest_text(practNum) {
    if (practNum === 1) {
      return (
        <div className={styles.questions}>
          Please indicate the number 65 with high certainty. <br />
          <br />
          <br />
        </div>
      );
    } else if (practNum === 2) {
      return (
        <div className={styles.questions}>
          Please indicate the number 65 with high UNcertainty. <br />
          <br />
          <br />
        </div>
      );
    } else if (practNum === 3) {
      return (
        <div className={styles.questions}>
          Please indicate the number 25 with high certainty. <br />
          <br />
          <br />
        </div>
      );
    } else if (practNum === 4) {
      return (
        <div className={styles.questions}>
          Please indicate the number 25 with high UNcertainty. <br />
          <br />
          <br />
        </div>
      );
    } else if (practNum === 5) {
      return (
        <div className={styles.questions}>
          What is your age ? (If the scale refers to 0 - 100). <br />
          <br />
          <br />
        </div>
      );
    } else if (practNum === 6) {
      return (
        <div className={styles.questions}>
          What is the population of Connecticut ?
          <br />
          (If the scale refers to 0 - 100 Million). <br />
          <br />
        </div>
      );
    } else if (practNum === 7) {
      return (
        <div className={styles.questions}>
          What is the population of New York City <br />
          (If the scale refers to 0 - 100 Million). <br />
          <br />
        </div>
      );
    }
  }

  redirectToNextStage() {

    this.props.history.push({
      pathname: `/TrainingIntroA`,
      state: {
        // userID: this.state.userID,
        // date: this.state.date,
        // startTime: this.state.startTime,
      },
    });

    // console.log("UserID is: " + this.state.userID);
  }
}

export default SliderPractice;
