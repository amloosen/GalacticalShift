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

    // var user_info = this.props.location.state.user_info;

    var currentDate = new Date();
    var introSliderStartTime = currentDate.toTimeString();

    /////////////////////////////////////////////////////////////////////////////////
    // SET COMPONENT STATES
    this.state = {
      // userID: userID,
      date: currentDate,
      startTime: introSliderStartTime,
      sectionTime: introSliderStartTime,
      taskSessionTry: 1,
      taskSession: "TrainingIntro",
      instructScreenText: 1,
      instructScreen: true,
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
      setTimeout(
        function () {
          this.nextPart();
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

  nextPart() {
    document.removeEventListener("keyup", this._handleInstructKey);
    document.removeEventListener("keyup", this._handleDebugKey);
    this.props.history.push({
      pathname: `/TrainingTask`,
      // pathname: `/elementsHover`,
      state: {
        userID: this.state.userID,
        date: this.state.date,
        startTime: this.state.startTime,
      },
    });
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
          <span className={styles.center}>
          Welcome to our study!
          </span>
          <br />
          In the following game, you will use a special response slider, with which you can indicate
          <br />
          both a number we are asking for and how certain you are about this number.
          <br />
          We will now show you how it works.
          <br />
          <br />
          <br /> <br />
          <span className={styles.center}>
          <i>(Use the ← → keys to navigate the pages.)</i>
          </span>
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
          <span className={styles.center}>
          Let&apos;s say you are estimating how much something costs.
          <br />
          If you make such an estimate you might be more or less certain about its accuracy.
          <br />
          This means, sometimes you might be certain (sure.) that your estimate is correct and other times you
          might be very uncertain (unsure) about your estimate.
          <br />
          <br />For instance a scenario might be:

          <br />
          Your estimate:
          <br />“The ice cream will cost £2”
          <br />
          Your certainty in your estimate
          <br />
          “I am very certain that the ice-cream will cost £2 since this is what I paid last time I went to this shop”
          or “I am very uncertain how much the ice-cream will actually cost because I have never been to this shop before.”
          <br /> <br />
          <span className={styles.center}>
          <i>(Use the ← → keys to navigate the pages.)</i>
          </span>
          <span className={styles.center}>
          [<strong>NEXT →</strong>]
          </span>
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
          <br /> and thus the population size is related to the measurement
          of your instrument.
          <br />
          <br />
          For example, the reading of the measurement could be reflecting
          the population size (in million) one-to-one.
          <br />
          This would mean that if the instrument shows you ‘40%’ 40 million
          aliens live on that planet. <br />
          <br />
          <span className={styles.center}>
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
          No one knows how the instrument readings map onto the population
          size of the planet.
          <br />
          <br />
          The association between the instrument reading and the population
          size will be
          <strong>more complex</strong> and also{" "}
          <strong>change at certain time points.</strong>
          <br />
          <br />
          It is your task to learn this and keep track of changes.
          <br /> <br />
          <span className={styles.center}>
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
          For simplicity, we will now introduce you to the structure by
          using simple mappings that will change at some point.
          <br /> <br />
          We want to see whether you can detect the change. <br />
          <br />
          <br /> <br />
          <span className={styles.center}>
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
          <br />
          <br />
          This will make it possible for you to find out how the instrument
          relates to the alien population size.
          <br /> <br />
          Let's practice this!
          <br /> <br />
          <span className={styles.center}>
          <i>(Use the ← → keys to navigate the pages.)</i>
          </span>
          <span className={styles.center}>
          [<strong>NEXT →</strong>]
          </span>
          </p>
          </div>
        );
      } else if (this.state.instructScreen === false) {
      }
    }

    return (
      <div className={styles.cockpit}>
      <div className={styles.textblock}>{text}</div>
      </div>
    );
  }
}

export default withRouter(TrainingIntro);
