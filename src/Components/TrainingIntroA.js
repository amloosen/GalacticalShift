import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import img_intro1 from "./intro/ExamplePicture1.jpg";
import img_left from "./intro/left.jpg";
import img_right from "./intro/right.jpg";
/////////////////////////////////////////////////////////////////////////////////t.Component {
class TrainingIntroA extends React.Component {
  constructor(props) {
    super(props);

    // var user_info = this.props.location.state.user_info;
    var currentDate = new Date();
    var introTrainingStartTime = currentDate.toTimeString();

    /////////////////////////////////////////////////////////////////////////////////
    // SET COMPONENT STATES
    this.state = {
      userID: this.props.location.state.userID,
      date: this.props.location.state.date,
      startTime: this.props.location.state.startTime,
      taskSession: "TrainingIntroA",
      instructScreenText: 1,
      instructScreen: true,
    };

    this.handleInstructLocal = this.handleInstructLocal.bind(this);

    /* prevents page from going down when space bar is hit .*/
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
      }
      if (e.keyCode === 39 && e.target === document.body) {
        e.preventDefault();
      }
      if (e.keyCode === 37 && e.target === document.body) {
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
          this.redirectToNextStage();
        }.bind(this),
        0
      );
    }
  }

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

  redirectToNextStage() {
    document.removeEventListener("keyup", this._handleInstructKey);
    document.removeEventListener("keyup", this._handleDebugKey);
    this.props.history.push({
      pathname: `/TrainingTaskA`,
      state: {
        userID: this.state.userID,
        date: this.state.date,
        startTime: this.state.startTime,
      },
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let text;
    if (this.state.instructScreen === true) {
      if (this.state.instructScreenText === 1) {
        document.addEventListener("keyup", this._handleInstructKey);
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING II</span>
              <br />
              Well done so far!
              <br /> <br />
              We will now introduce you to the main task itself, letting you<br /><br />
              complete few training trials.
              <br /> <br />
              For today&apos;s game, you will be a space explorer on an
              intergalactic mission. <br />
              <br />
              Your mission is it to tell your station on earth of how many
              aliens live on the planets you visit.
              <br />
              <br />
              It is critical that you give your best estimate of the alien
              population size <br /><br />for the mission to be successful.
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
              <span className={styles.center}>TRAINING II</span>
              So how can you find out how many aliens live on a planet?
              <br />
              <br />
              Your spaceship is equipped with several measuring instruments that
              will help you determine <br />
              <br />
              how many aliens live on the planet.
              <br />
              <br />A measuring instrument may look like this:
              <br /><br />
              <span className={styles.center}>
                <img src={img_intro1} alt="example1" />
              </span>
              <br />
              This instrument indicates 40% of the resource is available.
              <br />
              <br />
              <span className={styles.center}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 3) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING II</span>
              <br />
              The aliens living on these planets rely on natural resources,
              <br /> <br />
              and thus the population size is related to the measurement of your
              instrument.
              <br />
              <br />
              For example, the reading of the measurement could be reflecting
              the population size <br /><br />(in million) one-to-one. <br />
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
              <span className={styles.center}>TRAINING II</span>
              <br />
              However, a challenge makes your mission more difficult:
              <br />
              <br />
              No one knows how the instrument readings map onto the population
              size of the planet.
              <br />
              <br />
              The association between the instrument reading and the population
              size <br />
              <br />
              will be <strong>more complex</strong> and also{" "}
              <strong>change</strong> at some point.
              <br />
              <br />
              It is your task to learn the associations and keep track of
              changes.
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
              <span className={styles.center}>TRAINING II</span>
              <br />
              For simplicity, we will now introduce you to the structure of the
              game by
              <br />
              <br />
              using one instrument with simple associations that will change at
              some point.
              <br />
              <br />
              We want to see whether you can detect the associations and the
              changes.
              <br /> <br />
              First, look at the instrument by hoovering over the black square
              with your mouse. <br />
              <br />
              Second, choose between the two alternative population sizes <br />
              <br />
              on the screen using the corresponding arrow keys.
              <br /> For the option on the left side use the left arrow key
              <img
                className={styles.introImgTwo2}
                src={img_left}
                alt="example1"
              />
              <br />
              and for the option on the right use the right arrow key
              <img
                className={styles.introImgTwo2}
                src={img_right}
                alt="example1"
              />
              <br />
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
              <span className={styles.center}>TRAINING II</span>
              <br />
              For your first training, we will show you how many aliens actually
              lived on the planet <br />
              <br />
              after you indicated your answer.
              <br />
              <br />
              This will make it possible for you to find out how the instrument
              relates to <br /><br />the alien population size.
              <br /> <br />
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

export default withRouter(TrainingIntroA);
