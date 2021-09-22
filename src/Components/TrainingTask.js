import React, { useState, Component}  from "react";
import { withRouter } from "react-router-dom";
import { DATABASE_URL } from "./config";
import styles from "./style/taskStyle.module.css";
import Slider from "./slider";
import ElementsFullDisplay from "./elementsFulldisplay";
import Cockpit from "./img/CockpitBlank.jpg";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

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
      trialTime0: 0,
      trialTotal: trialTotal,//adapt
      // //
      // trialSliderRT: null,
      trialSgmMu: trialSgmMu,
      timerCountDur: 10,
      // timerKey: 0,
      timePassed: false,
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
   setTimeout(() => {this.setState({timePassed: true})}, 1700);
   if (!this.state.timePassed){
     return (
       <ElementsFullDisplay  value1={30} value2={40} value3={80} trialTotal={this.state.trialTotal} trialNum={this.state.trialNum}/>
     );
   }else{

     return (
    <div>{this.renderSlider()}</div>
  );
 }
 }



  // implement method to change values on elements etc.
  renderSlider(){
     let trialTime0 = Math.round(performance.now());

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
        <Slider onSpacebarHit={(result) => this.saveSgmMu(result,trialTime0)} />
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
          trialNum : trialNum+1,
        });
    }

//   onTimeout() {
//     debugger;
//   this.setState({ elementshow: false });
//
// }

    // renderElements(){
    //       return(
    //       <div>
    //       <ElementsFullDisplay value1={30} value2={40} value3={80} trialTotal={this.state.trialTotal} trialNum={this.state.trialNum}/>
    //       </div>
    //     );
    // }

}

  export default withRouter(TrainingTask);
