import React from "react";
// import { DATABASE_URL } from "./config";
import styles from "./style/taskStyle.module.css";
import DisplaySliderTrainer from "./DisplaySliderTrainer";

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
      startSgm: 30,
      startMu: 50,
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
  componentDidMount() {}

  componentWillUnmount() {}
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
    let choiceTime0 = Math.round(performance.now());
    return (
      <DisplaySliderTrainer
        trialSgmMu={this.state.practSgmMu}
        trialRT={this.state.practRT}
        trialNum={this.state.practNum}
        startSgm={this.state.startSgm}
        startMu={this.state.startMu}
        onSliderEnd={this.handleSliderData}
        practNum={this.state.practNum}
      />
    );
  }
  /////////////////////////////////////////////////////////////////////////////////
  handleSliderData = (result, time) => {
    let practSgmMu = this.state.practSgmMu;
    let practRT = this.state.practRT;
    let practNum = this.state.practNum;
    practSgmMu[practNum - 1][1] = result.sgm;
    practSgmMu[practNum - 1][2] = result.mu;
    practRT[practNum - 1][0] = practNum;
    practRT[practNum - 1][1] = time;
    practRT[practNum - 1][2] = Math.round(performance.now());
    practRT[practNum - 1][3] = practRT[practNum - 1][2] - time;

    if (this.state.practNum === this.state.practTotal) {
      this.redirectToNextStage();
    } else {
      this.setState({
        practSgmMu: practSgmMu,
        practRT: practRT,
        practNum: practNum + 1,
      });
    }
  };


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
