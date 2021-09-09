import React from "react";
import { withRouter } from "react-router-dom";
import { DATABASE_URL } from "./config";

import styles from "./style/taskStyle.module.css";
import Cockpit from "./img/CockpitBlank.jpg";

import img_intro1 from "./intro/ExamplePicture1.jpg";
import img_intro2 from "./intro/ExamplePicture2.jpg";
import img_intro3 from "./intro/ExamplePicture3.jpg";
/////////
var trialTotal = 9;

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
// REACT COMPONENT START
class TrainingIntro extends React.Component {
  constructor(props) {
    super(props);

    const userID = this.props.location.state.userID;
    const date = this.props.location.state.date;
    const startTime = this.props.location.state.startTime;

    var currentDate = new Date(); // maybe change to local
    var timeString = currentDate.toTimeString();

    /////////////////////////////////////////////////////////////////////////////////
    // SET COMPONENT STATES
    this.state = {
      userID: userID,
      date: date,
      startTime: startTime,
      sectionTime: timeString,
      taskSessionTry: 1,
      taskSession: "TrainingIntro",
      instructScreenText: 1,

      // outcomeNotAnsLog2: outcomeNotAnsLog2,

      // trialNum: 1,
      // trialTotal: trialTotal,
      // trialRT: 0,
      // trialTime: 0,
      instructScreen: true,
      // testScreen: false,
      //
      // debug: false //if true, skip this section
    };

    this.handleInstructLocal = this.handleInstructLocal.bind(this);

    /* prevents page from going down when space bar is hit .*/
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
      }
    });
  }
  /////////////////////////////////////////////////////////////////////////////////
  // END COMPONENT STATE

  // This handles instruction screen within the component USING KEYBOARD
  handleInstructLocal(key_pressed) {
    var curText = this.state.instructScreenText;
    var whichButton = key_pressed;

    if (whichButton === 4 && curText > 1) {
      this.setState({ instructScreenText: curText - 1 });
    } else if (whichButton === 5 && curText < 6) {
      this.setState({ instructScreenText: curText + 1 });
    } else if (curText === 6 && whichButton === 10) {
    //   //startmissionOne
    //   setTimeout(
    //     function () {
    //       this.missionOne();
    //     }.bind(this),
    //     0
    //   );
    // } else if (curText === 7 && whichButton === 10) {
    //   //restart
    //   this.setState({
    //     instructScreenText: 1,
    //   });
    // } else if (curText === 8 && whichButton === 10) {
    //   //go to TrainingTask
      setTimeout(
        function () {
          this.nextMission();
        }.bind(this),
        0
      );
    }
  }

  // handle key key_pressed
  _handleInstructKey = (event) => {
    var key_pressed;

    switch (event.keyCode) {
      case 37:
        //    this is left arrow
        key_pressed = 4;
        this.handleInstructLocal(key_pressed);
        break;
      case 39:
        //    this is right arrow
        key_pressed = 5;
        this.handleInstructLocal(key_pressed);
        break;
      case 32:
        //    this is SPACEBAR
        key_pressed = 10;
        this.handleInstructLocal(key_pressed);
        break;
      default:
    }
  };

  /////////////////////////////////////////////////////////////////////////////////
  // END COMPONENT PROPS
  //
  // condSave() {
  //   var userID = this.state.userID;
  //   var currentDate = new Date(); // maybe change to local
  //   var sectionTime = currentDate.toTimeString();
  //   var trialTime = Math.round(performance.now());
  //
  //   let saveString = {
  //     userID: this.state.userID,
  //     date: this.state.date,
  //     startTime: this.state.startTime, // this is when they start the expt
  //     sectionTime: sectionTime, //this is if they somehow refresh the page...
  //     trialTime: trialTime,
  //     taskSession: this.state.taskSession,
  //     taskSessionTry: this.state.taskSessionTry};
  //
  //   console.log(saveString);
  //
  //   try {
  //     fetch(`${DATABASE_URL}/cond_data/` + userID, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(saveString),
  //     });
  //   } catch (e) {
  //     console.log("Cant post?");
  //   }
  // }
  //
  // trialSave() {
  //   var userID = this.state.userID;
  //
  //   let saveString = {
  //     userID: this.state.userID,
  //     date: this.state.date,
  //     startTime: this.state.startTime, // this is when they start the expt
  //     sectionTime: this.state.sectionTime, //this is if they somehow refresh the page...
  //     taskSession: this.state.taskSession
  //   };
  //
  //   try {
  //     fetch(`${DATABASE_URL}/outcome_test/` + userID, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(saveString),
  //     });
  //   } catch (e) {
  //     console.log("Cant post?");
  //   }
  //
  //   //send the TrainingIntro conditions?
  //   setTimeout(
  //     function () {
  //       this.condSave();
  //     }.bind(this),
  //     0
  //   );
  // }
  //
  // passMission() {
  //   this.setState({
  //     instructScreen: true,
  //     testScreen: false,
  //     instructScreenText: 8,
  //   });
  // }

  nextMission() {
    document.removeEventListener("keyup", this._handleInstructKey);
    document.removeEventListener("keyup", this._handleDebugKey);
    this.props.history.push({
      pathname: `/TrainingTask`,
      state: {
        userID: this.state.userID,
        date: this.state.date,
        startTime: this.state.startTime},
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    //send the TrainingIntro conditions?

    // setTimeout(
    //   function () {
    //     this.condSave();
    //   }.bind(this),
    //   0
    // );

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

  //////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////
  // render time

  render() {
    let text;
      if (this.state.instructScreen === true) {
        if (this.state.instructScreenText === 1) {
          document.addEventListener("keyup", this._handleInstructKey);
          text = (
            <div className={styles.main}>
            <p>
            <span className={styles.center}>
            Hello and welcome on onboard!
            </span>
            <br />
            For today&apos;s mission, you will be a space explorer on an intergalactic mission.
            <br />
            <br />
            Your mission is to tell your station on earth of how many aliens live on the planets you visit.
            <br /> <br />It is critical that you give your best estimate of the alien population size for the mission to be successful.
            <br /> <br />
            We will now tell you how you can infer the population size once you reached a planet.
            <br /> <br />
            <span className={styles.centerTwo}>
            <i>(Use the ← → keys to navigate the pages.)</i>
            </span>
            <span className={styles.centerTwo}>
            [<strong>NEXT →</strong>]
            </span>
            </p>
            </div>
          );
        } else if (this.state.instructScreenText === 2) {
          text = (
            <div className={styles.main}>
            <p>
            <span className={styles.center}>
            TRAINING I
            </span>

            So how can you find out how many aliens live on a planet?
            <br />
            <br />
            Your spaceship is equipped with several measuring instruments
            <br />
            that will help you determine how many aliens live on the planet.
            <br /><br />A measuring instrument may look like this:
            <br /> <br />
            <span className={styles.centerTwo}>
            <img src={img_intro1} alt="example1"  />
            />
            </span>
            <br />
            This instrument indicates 40% of the resource is available.
            <br />
            <br />
            <span className={styles.centerTwo}>
            [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
            </span>
            </p>
            </div>
          );
        } else if (this.state.instructScreenText === 3) {
          text = (
            <div className={styles.main}>
            <p>
            <span className={styles.center}>TRAINING I</span>
            <br />
            The aliens living on these planets rely on natural resources,
            <br /> and thus the population size is related to the measurement of your instrument.
            <br />
            <br />
            For example, the reading of the measurement could be reflecting the population size (in million) one-to-one.
            <br />
            This would mean that if the instrument shows you ‘40%’ 40 million aliens live on that planet. <br />
            <br />
            <span className={styles.centerTwo}>
            [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
            </span>
            </p>
            </div>
          );
        } else if (this.state.instructScreenText === 4) {
          text = (
            <div className={styles.main}>
            <p>
            <span className={styles.center}>TRAINING I</span>
            <br />
            However, a challenge makes your mission more difficult:
            <br />
            <br />
            No one knows how the instrument readings map onto the population size of the planet.
            <br />
            <br />
            The association between the instrument reading and the population size will be
            <strong>more complex</strong> and also <strong>change at certain time points.</strong><br />
            <br />
            It is your task to learn this and keep track of changes.
            <br /> <br />
            <span className={styles.centerTwo}>
            [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
            </span>
            </p>
            </div>
          );
        } else if (this.state.instructScreenText === 5) {
          text = (
            <div className={styles.main}>
            <p>
            <span className={styles.center}>TRAINING I</span>
            <br />
            For simplicity, we will now introduce you to the structure by using simple mappings
            that will change at some point.
            <br /> <br />
            We want to see whether you can detect the change. <br /><br />
            <br /> <br />
            <span className={styles.centerTwo}>
            [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
            </span>
            </p>
            </div>
          );
        } else if (this.state.instructScreenText === 6) {
          text = (
            <div className={styles.main}>
            <p>
            <span className={styles.center}>TRAINING I</span>
            <br />
            For your first training, after you indicated your answer <br />
            we will show you how many aliens actually lived on the planet.
            <br /><br />
            This will make it possible for you to find out how the instrument relates to the alien population size.
            <br /> <br />
            Let's practice this!
            <br /> <br />
            <span className={styles.centerTwo}>
            Press the [<strong>SPACEBAR</strong>] to start the training.
            </span>
            <span className={styles.centerTwo}>
            [<strong>← BACK</strong>]
            </span>
            </p>
            </div>
          );
        } else if (this.state.instructScreen === false) {}
      }

    return (
      <div className={styles.cockpit}>
        <div className={styles.textblock}>{text}</div>
      </div>
    );
  }
}

export default withRouter(TrainingIntro);
