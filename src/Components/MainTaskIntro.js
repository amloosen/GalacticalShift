import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import img_indicat1 from "./intro/indicat1.png";
import img_indicat2 from "./intro/indicat2.png";
import img_indicat3 from "./intro/indicat3.png";
/////////////////////////////////////////////////////////////////////////////////
// REACT COMPONENT START
class MainTaskIntro extends React.Component {
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
      taskSession: "MainTaskIntro",
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
    // this.props.history.push({
    //   pathname: `/MainTask`,
    //   // state: {
    //   //   // userID: this.state.userID,
    //   //   // date: this.state.date,
    //   //   // startTime: this.state.startTime,
    //   // },
    // });
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
              <span className={styles.center}>MAIN GAME</span>
              <br />
              Welcome to the main game!
              <br />
              <br />
              The main game will be very similar to the last training stage,
              with one crucial difference:
              <br />
              <br />
              Now, you have to find out which instrument is important at a given
              time and it will not be highlighted anymore.
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
              <span className={styles.center}>MAIN GAME</span>
              <br />
              <br />
              You again have to master the three challenges: <br />
              <br />
              <strong>1.</strong> Find out which instrument is important.
              <br /> <br />
              <strong>2.</strong> Find out how it is associated with the
              population size <br /> <br />
              <strong>3.</strong> Recognize changes in 1. or 2. and adapt your
              answer.
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
              <span className={styles.center}>MAIN GAME</span>
              <br />
              <strong>Remember:</strong>
              <br />
              <br />
              Planets (trials) that you encounter after each other, are more
              similar to each other than planets that are further apart. This
              means, their population size depends on the same instrument.
              <br /> <br />
              Keep this in mind when indicating your answers.
              <br />
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
              <span className={styles.center}>MAIN GAME</span>
              <br />
              <br />
              As in the training, not only your estimate is important, but also
              your certainty in your estimate. After each trial you will be
              rewarded for the correctness of your estimate and your certainty
              in it.
              <br />
              <br />
              Please try to indicate your estimate and certainty as precisely as
              possible.
              <br />
              <br />
              From now on, your collected reward will count towards your bonus
              payment at the end of the experiment.
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
              <span className={styles.center}>MAIN GAME</span>
              <br />
              <br />
              As you have learned in the training, only one instrument
              determines the population size at a given moment.
              <br /> <br />
              To probe your understanding of the task we will sometimes,
              randomly ask you to indicate which colour/instrument is the
              important one at a given stage of the task by pressing the
              indicated number key (see example below). Please answer the
              question as accurately as possible.
              <br /> <br />
              <span className={styles.centerThree_intro}>
                <img
                  className={styles.elementsize}
                  src={img_indicat1}
                  alt="example1"
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <img
                  className={styles.elementsize}
                  src={img_indicat2}
                  alt="example1"
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <img
                  className={styles.elementsize}
                  src={img_indicat3}
                  alt="example1"
                />
              </span>
              <br />
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
              <span className={styles.center}>MAIN GAME</span>
              <br />
              <br />
              It is important, that you complete the game in one go. However,
              there will be short breaks in between, that you can choose to take
              or you can continue by pressing the space bar.
              <br />
              <br />
              Good luck with the main game!
              <br /> <br />
              <span className={styles.main}>
                Press the [<strong>SPACEBAR</strong>] when you are ready to
                start.
              </span>
              <br /> <br />
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

export default withRouter(MainTaskIntro);
