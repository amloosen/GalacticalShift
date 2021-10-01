import React from "react";
import { withRouter } from "react-router-dom";
import { DATABASE_URL } from "./config";

import styles from "./style/taskStyle.module.css";
import Cockpit from "./img/CockpitBlank.jpg";

import img_intro1 from "./intro/ExamplePicture1.jpg";
/////////
var trialTotal = 9;

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
// REACT COMPONENT START
class TrainingIntroB extends React.Component {
  constructor(props) {
    super(props);

    // var user_info = this.props.location.state.user_info;
    var currentDate = new Date();
    var introTrainingStartTime = currentDate.toTimeString();

    /////////////////////////////////////////////////////////////////////////////////
    // SET COMPONENT STATES
    this.state = {
      // userID: userID,
      sectionStartTime: introTrainingStartTime,
      taskSessionTry: 1,
      taskSession: "TrainingIntroB",
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
    } else if (whichButton === 5 && curText < 3) {
      this.setState({ instructScreenText: curText + 1 });
    } else if (curText === 3 && whichButton === 10) {
      setTimeout(
        function () {
          this.redirectToNextStage();
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
  redirectToNextStage() {
    document.removeEventListener("keyup", this._handleInstructKey);
    document.removeEventListener("keyup", this._handleDebugKey);
    this.props.history.push({
      pathname: `/TrainingTaskB`,
      state: {
        userID: this.state.userID,
        date: this.state.date,
        startTime: this.state.startTime,
      },
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);

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
  render() {
    let text;
    if (this.state.instructScreen === true) {
      if (this.state.instructScreenText === 1) {
        document.addEventListener("keyup", this._handleInstructKey);
        text = (
          <div className={styles.main}>
            <p>
            <span className={styles.center}>TRAINING III</span>
            <br /><br />
              Your space-training session is going well!
              <br />
              <br />
              Another challenge makes your mission even more difficult:
              <br />
              <br />
              Your spaceship has <strong>three</strong> measuring instruments
              showing different natural resources.
              <br />
              <br />
              You have to find out <strong>which one is relevant</strong>{" "}
              and determining the population size.
              <br />
              <br />
              <span className={styles.center}>
                [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 2) {
        text = (
          <div className={styles.main}>
            <p>
            <span className={styles.center}>TRAINING III</span>
              <br />
              <br />
              Again, sometimes this might change, which means suddenly a new
              instrument will be relevant. You have to recognize these changes.
              <br />
              <br />
              This means, now you have to <br />
              <br /><strong>(1)</strong> find out which
              instrument is relevant, <br />
              <br /><strong>(2)</strong> what its association
              with the population size is,
              <br />
              <br /><strong>(3)</strong> detect when suddenly a new instrument is
              relevant or when the association to the population size changes.
              <br />
              <br />
              <span className={styles.center}>
                [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 3) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING III</span>
              Again, the true population size will for now be shown after each planet. This will make
              it possible for you to find out which instrument is of importance and how it is associated to the population size.
              <br />
              <br />
              Indicate the value by pressing the corresponding left and right arrow key.
              <br />
              <br />
              Let's practice this!
              <br /> <br />
              <span className={styles.center}>
                Press the [<strong>SPACEBAR</strong>] to start the training.
              </span>
              <span className={styles.center}>
                [<strong>← BACK</strong>]
              </span>
            </p>
          </div>
        );
      }
    }

    return (
      <div className={styles.cockpit}>
        <div className={styles.textblock}>{text}</div>
      </div>
    );
  }
}

export default withRouter(TrainingIntroB);
