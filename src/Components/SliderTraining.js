import React from "react";
import { API_URL } from "../config";
import DisplaySliderTrainer from "./DisplaySliderTrainer";

/////////////////////////////////////////////////////////////////////////////////
class SliderPractice extends React.Component {
  constructor(props) {
    super(props);
    var currentDate = new Date(); // maybe change to local
    var timeString = currentDate.toTimeString();

    let practSgmMu = Array(7)
      .fill()
      .map(() => Array(3).fill(0));
    let practRT = Array(7)
      .fill()
      .map(() => Array(3).fill(0));

    this.state = {
      sectionTime: timeString,
      userID: this.props.userID,
      date: this.props.date,
      startTime: this.props.startTime,
      taskSession: "SliderPractice",
      practTotal: 7,
      practNum: 1,
      practRT: practRT,
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
  componentDidMount() {

  }

  componentWillUnmount() {


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
    let body = {
      sectionStartTime: this.state.sectionTime,
      startTime: this.state.startTime,
      practSgmMu: this.state.practSgmMu,
      practNum: this.state.practNum
    };

    fetch(
      `${API_URL}/start_info/create/` +
        this.state.userID +
        `/` +
        this.state.study_part,
      {
        //eigentlich auch in den body beim ersten mal
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    ////////////////////////
    this.props.history.push({
      pathname: `/TrainingIntroA`,
      state: {
        userID: this.state.userID,
        date: this.state.date,
        startTime: this.state.startTime,
      },
    });

    // console.log("UserID is: " + this.state.userID);
  }
}

export default SliderPractice;
