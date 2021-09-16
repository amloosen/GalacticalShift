import React, { useState }  from "react";
import { withRouter } from "react-router-dom";
import { DATABASE_URL } from "./config";
import styles from "./style/taskStyle.module.css";
import Slider from "./slider";
import Cockpit from "./img/CockpitBlank.jpg";
// import ElementsTraining  from "./elementsTraining";
/////////////////////////////////////////////////////////////////////////////////

class TrainingTask extends React.Component {
  constructor(props) {
    super(props);

    let trialTotal = 9;//update later

    let trialSgmMu = Array(trialTotal).fill().map(() => Array(3).fill(0));
    let trialRT = Array(trialTotal).fill().map(() => Array(3).fill(0));
    /////////////////////////////////////////////////////////////////////////////////
    // SET COMPONENT STATES
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

  // implement method to change values on elements etc.
    render() {
var trial = this.state.trialNum;

renderSlider(){
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
      <Slider onSpacebarHit={(result) => this.saveSgmMu(result)} />
      </div>
    );
  }



    saveSgmMu(result) {
      debugger;
      trialSgmMu[trialNum-1][0]= this.state.trialNum+1;
      trialSgmMu[trialNum-1][1] = result.sgm;
      trialSgmMu[trialNum-1][2] = result.mu;
      trialRT[trialNum-1][0] = trialNum;
      trialRT[trialNum-1][1] = Math.round(performance.now())- trialTime0;


      // setTimeout(
      //   function() {
      //     this.setState({
      //       trialTime0: trialTime0,
      //       trialSgmMu: trialSgmMu,
      //       trialRT: trialRT,
      //     });
      //   }
      //   .bind(this),
      //   1000
      // );
   }


      // renderElements(val, col){
      //   return <ElementsTraining value={val} col={col} training_apple_col={this.props.training_apple_col}/>;
      // }


///
    //   trialSave() {
    //     var userID = this.state.userID;
    //     var currentDate = new Date(); // maybe change to local
    //     var sectionTime = currentDate.toTimeString();
    //     var trialTime = Math.round(performance.now());
    //
    //     let saveString = {
    //       userID: this.state.userID,
    //       date: this.state.date,
    //       startTime: this.state.startTime, // this is when they start the expt
    //       sectionTime: sectionTime, //this is if they somehow refresh the page...
    //       trialTime: trialTime,
    //       taskSession: this.state.taskSession,
    //
    //       structNum: null,
    //
    //       level: this.state.level,
    //       trialNum: this.state.trialNum,
    //       trialTotal: this.state.trialTotal,
    //       trialSliderRT: this.state.trialSliderRT,
    //       trialMu: this.state.trialMu,
    //       trialSgm: this.state.trialSgm,
    //       trialTime: this.state.trialTime,
    //       trialScore: this.state.trialScore,
    //       valElem1: this.state.valElem1,
    //       valElem2: this.state.valElem2,
    //       valElem3: this.state.valElem3,
    //       colElem1: this.state.colElem1,
    //       colElem2: this.state.colElem2,
    //       colElem3: this.state.colElem3
    //
    //     };
    //     //
    //     // console.log(saveString);
    //
    //     try {
    //       fetch(`${DATABASE_URL}/trainingTrial_data/` + userID, {
    //         method: "POST",
    //         headers: {
    //           Accept: "application/json",
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(saveString),
    //       });
    //     } catch (e) {
    //       console.log("Cant post?");
    //     }
    //
    //     //lag a bit to make sure statestate is saved
    //     setTimeout(
    //       function () {
    //         this.trialNext();
    //       }.bind(this),
    //       10
    //     );
    //   }
    //
    //   trialNext() {
    //     var trialNum = this.state.trialNum + 1;
    //     var trialTime = Math.round(performance.now());
    //
    //     this.setState({
    //       trialTime: trialTime,
    //       trialNum: trialNum,
    //       trialSliderRT: null,
    //       trialMu: null,
    //       trialSgm: null,
    //       trialTime: null,
    //       trialScore: null,
    //       valElem1: null,
    //       valElem2: null,
    //       valElem3: null,
    //       colElem1: null,
    //       colElem2: null,
    //       colElem3: null
    //     });
    //   }
    //
    // componentWillUnmount() {
    //   // fix Warning: Can't perform a React state update on an unmounted component
    //   this.setState = (state, callback) => {
    //     return;
    //   };
    // }
  }




  export default withRouter(TrainingTask);
