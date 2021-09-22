import React, { useState, Component}  from "react";
import { withRouter } from "react-router-dom";
import { DATABASE_URL } from "./config";
import styles from "./style/taskStyle.module.css";
import Slider from "./slider";
import OutcomeSlider from "./sliderOutcome";
import ElementsFullDisplay from "./elementsFulldisplay";
import Cockpit from "./img/CockpitBlank.jpg";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////
class TrainingTask extends React.Component {
  constructor(props) {
    super(props);

    let trialTotal = 9;//update later

    let trialSgmMu = Array(trialTotal).fill().map(() => Array(3).fill(0));
    let trialRT = Array(trialTotal).fill().map(() => Array(3).fill(0));

    this.state = {
      // userID: userID,
      // date: date,
      // startTime: startTime,
      // sectionTime: timeString,
      // taskSessionTry: 1,
      // taskSession: "TrainingTask",
      trialNum: 1,//adapt
      trialRT: trialRT,
      choiceTime0: 0,
      trialTotal: trialTotal,//adapt
      // //
      // trialSliderRT: null,
      trialSgmMu: trialSgmMu,
      timerCountDur: 10,
      timePassed: false,
      feedback: false,
      // trialTime: null,
      // trialScore: null,
      // valElem1: null,
      // valElem2: null,
      // valElem3: null,
      // colElem1: null,
      // colElem2: null,
      // colElem3: null
    };
  }

  // render() {
  //   return (<div>
  //           <div>{this.renderElements()}</div>
  //           // <div>{this.renderSlider()}</div>
  //           </div>);
  // }
  render() {
   setTimeout(() => {this.setState({timePassed: true})}, 10000);
   if (!this.state.timePassed){
     return (
       <ElementsFullDisplay  value1={30} value2={40} value3={80} trialTotal={this.state.trialTotal} trialNum={this.state.trialNum}/>
     );
   }else if (this.state.feedback===false){
    return (
    <div>{this.renderSlider()}</div>
  );}
  else {
      <div>{this.showFeedback()}</div>
  }
 }



  // implement method to change values on elements etc.
  renderSlider(){
     let choiceTime0 = Math.round(performance.now());

     let text = (
      <div className={styles.questions}>
      How large is the alien population?
      <br />
      <br />
      <br />
      </div>);

      return (
        <div className={styles.cockpit}>
        <div>{text}</div>
        <Slider onSpacebarHit={(result) => this.saveSgmMu(result,choiceTime0)} />
        </div>
      );
    }

    saveSgmMu(result,time) {
      let trialSgmMu = this.state.trialSgmMu;
      let trialRT = this.state.trialRT;
      let trialNum = this.state.trialNum;
      trialSgmMu[trialNum-1][1] = result.sgm;
      trialSgmMu[trialNum-1][2] = result.mu;
      trialRT[trialNum-1][0] = trialNum;
      trialRT[trialNum-1][1] = time;
      trialRT[trialNum-1][2] = Math.round(performance.now());
      trialRT[trialNum-1][3] = trialRT[trialNum-1][2] - time;

      this.setState({
          trialSgmMu: trialSgmMu,
          trialRT: trialRT,
          feedback: true
          // trialNum : trialNum+1,
          // outcome: show
        });
        debugger;
    }

    showFeedback(result){
    var trueValue = 50;
    let feedbackTime = Math.round(performance.now());

    let text = (
     <div className={styles.questions}>
     The true population on the planet was ${trueValue} mio.'
     <br />
     <br />
     <br />
     </div>);

     return (
       <div className={styles.cockpit}>
       <div>{text}</div>
       <OutcomeSlider mu={this.state.trialSgmMu[this.state.trialNum-1][2]} sgm={this.state.trialSgmMu[this.state.trialNum-1][1]} value={trueValue}/>
       </div>
     );}

}

  export default withRouter(TrainingTask);
