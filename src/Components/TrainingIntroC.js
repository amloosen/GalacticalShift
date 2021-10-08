import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import img_intro1 from "./intro/ExamplePicture1.jpg";
import img_bar from "./intro/bar.png";
/////////////////////////////////////////////////////////////////////////////////
// REACT COMPONENT START
class TrainingIntroC extends React.Component {
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
      taskSession: "TrainingIntroC",
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
    document.removeEventListener("keyup", this._handleDebugKey);
    this.props.history.push({
      pathname: `/TrainingTaskC`,
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
              <span className={styles.center}>TRAINING IV</span>
              <br />
              Great job!
              <br />
              <br />
              You will now be introduced to the main game. We will bring all the
              parts together that you learned so far.
              <br />
              <br />
              This means, these task will be similar to the previous training
              trials but the introduced challenges will be combined and become more difficult.
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
              <span className={styles.center}>TRAINING IV</span>
              <br />
              <br />
              From now on, you will be asked to use the slider.
              Remember, with the slider you can indicate your <strong>estimate</strong>, by changing the peak of the slider
              and your <strong> certainty</strong> in your estimate by changing the shape of the
              slider.
              <br />
              <br />
              Again, you have to find out <strong>(1)</strong> which instrument
              is important and <strong>(2)</strong> how it is associated with
              the population size. This association as well as the instrument of
              importance will <strong>(3)</strong> change over time. Detect these changes and adapt your estimate accordingly.
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
              <span className={styles.center}>TRAINING IV</span>
              <br />
              <br />
              However, from now on the associations between the instruments and
              the population size will be <strong>more complex</strong>.
              <br />
              <br />
              For this training, we will, therefore, give you some help. We will show you which instrument is of
              importance by highlighting it like this:
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.relevInd}
                  src={img_intro1}
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
      } else if (this.state.instructScreenText === 4) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING IV</span>
              <br />
              <br />
              <strong>An additional hint:</strong><br /><br />
              As you might have noticed in the trainig session, planets (trials)
              that you encounter after each other, are more similar to each other than planets that are further
              apart. <br />
              <br />
              This means, their population size depends on the same instrument.
              Keep this in mind when indicating your answers.
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
              <span className={styles.center}>TRAINING IV</span>
              <br />
              <br />
              Also, not only your estimate is important, but also your
              certainty in your estimate. After each trial you will be rewarded
              for the correctness of your estimate and your certainty in it.
              <br />
              <br />
              This reward will be indicated by a bar that look like this: <br />
              <br />
              <span className={styles.center}>
                <img src={img_bar} alt="bar" />
              </span>
              During this training stage the collected reward is however only
              for demonstration and will be deleted after the training. Please
              try to indicate your estimate and certainty as precisely as
              possible.
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
              <span className={styles.center}>TRAINING IV</span>
              <br />
              <br />
              Again, the true population size shown after each planet will make
              it possible for you to find out which instrument (i.e. which
              colour) is of importance.
              <br />
              <br />
              Let’s practice that!
              <br /> <br />
              <span className={styles.center}>
                Press the [<strong>SPACEBAR</strong>] to start the final training.
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

export default withRouter(TrainingIntroC);
