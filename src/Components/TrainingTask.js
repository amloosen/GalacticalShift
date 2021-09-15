import React, { useState }  from "react";
import { withRouter } from "react-router-dom";
import { DATABASE_URL } from "./config";
import styles from "./style/taskStyle.module.css";
import Slider from "./slider";
import Cockpit from "./img/CockpitBlank.jpg";
// import ElementsTraining  from "./elementsTraining";
/////////////////////////////////////////////////////////////////////////////////

// var trialTotal = 9;
//
// setTimeout(
//   function () {
//     this.trialSave();
//   }.bind(this),
//   0
// );
//
//
// setTimeout(
//   function () {
//     this.setState({
//       mounted: 1,
//     });
//   }.bind(this),
//   5000
// );
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
// REACT COMPONENT START
class TrainingTask extends React.Component {
  constructor(props) {
    super(props);

    // const userID = this.props.location.state.userID;
    // const date = this.props.location.state.date;
    // const startTime = this.props.location.state.startTime;
    // var currentDate = new Date(); // maybe change to local
    // var timeString = currentDate.toTimeString();

    /////////////////////////////////////////////////////////////////////////////////
    // SET COMPONENT STATES
    this.state = {
      // userID: userID,
      // date: date,
      // startTime: startTime,
      // sectionTime: timeString,
      // taskSessionTry: 1,
      // taskSession: "TrainingTask",
      // level: 1,//adapt later
      // trialNum: 1,//adapt
      // trialTotal: 1,//adapt
      // //
      // trialSliderRT: null,
      // trialMu: null,
      // trialSgm: null,
      // trialTime: null,
      // trialScore: null,
      // valElem1: null,
      // valElem2: null,
      // valElem3: null,
      // colElem1: null,
      // colElem2: null,
      // colElem3: null,
      // taskPart: 2
    };
    // this.switchImage = this.switchImage.bind(this);
  }

  // switchTaskpart() {
  //   this.setState({
  //     taskPart: 2
  //   });
  // }

    // componentDidMount() {
    //   setTimeout(this.switchTaskpart, 1000);
    // }

    render() {
      // if (this.state.taskPart===1){

        // return (<div className={styles.cockpit}>
        //   //   <div>{text}</div>
        //   <ElementsTraining onSpacebarHit={(result) => window.alert(JSON.stringify(result))} />
        //   </div>);
        //
        // } else {
          let text = (
            <div className={styles.questions}>
            How large is the alien population?
            <br />
            <br />
            <br />
            </div>

          );
          return (<div className={styles.cockpit}>
            <div>{text}</div>
            <Slider onSpacebarHit={(result) => window.alert(JSON.stringify(result))} />
            </div>);
        // }
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
