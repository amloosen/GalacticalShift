import React from "react";
import { withRouter } from "react-router-dom";
import { DATABASE_URL } from "./config";
import styles from "./style/taskStyle.module.css";
import Slider from "./slider";
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
class SliderPractice extends React.Component {
  constructor(props) {
    super(props);

    let practSgmMu = Array(trialTotal).fill().map(() => Array(3).fill(0));
    let practlRT = Array(trialTotal).fill().map(() => Array(3).fill(0));

    this.state = {
      // userID: userID,
      // date: date,
      // startTime: startTime,
      // sectionTime: timeString,
      // taskSessionTry: 1,
      // taskSession: "SliderPractice",
      practTotal: 9,
      trianNum: 1,//adapt
      practlRT: practlRT,
      choiceTime0: 0,
      trialTotal: trialTotal,//adapt
      // //
      practSgmMu: practSgmMu,
      timerCountDur: 10,
      timePassed: false,
      feedback: false,
      mounted: 0,
      trueValue: 50
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
    window.addEventListener('keydown', function(e) {
    if(e.keyCode === 37 && e.target === document.body) {
      e.preventDefault();
    }
    else if(e.keyCode === 39 && e.target === document.body) {
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
  if (this.state.trianNum<=this.state.practTotal){


       return (
        <div className={styles.cockpit}>
        <div>{text}</div>
        <Slider onSpacebarHit={(result) => {this.saveSgmMu(result,choiceTime0);}}/>
        </div>);
}}
/////////////////////////////////////////////////////////////////////////////////
  saveSgmMu(result,time) {
      let practSgmMu = this.state.practSgmMu;
      let practlRT = this.state.practlRT;
      let trianNum = this.state.trianNum;
      practSgmMu[trianNum-1][1] = result.sgm;
      practSgmMu[trianNum-1][2] = result.mu;
      practlRT[trianNum-1][0] = trianNum;
      practlRT[trianNum-1][1] = time;
      practlRT[trianNum-1][2] = Math.round(performance.now());
      practlRT[trianNum-1][3] = practlRT[trianNum-1][2] - time;
      this.setState({
          practSgmMu: practSgmMu,
          practlRT: practlRT,
          feedback: true,
          trianNum : trianNum+1,
          // outcome: show
        });}

        bubble_text(questNr){
          if (questNr===1){
            let text = (
             <div className={styles.questions}>
             How large is the alien population?
             <br />
             <br />
             <br />
             </div>)
          }
        }
}

export default SliderPractice;
