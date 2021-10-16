import React from "react";
import { withRouter } from "react-router-dom";

import styles from "./style/taskStyle.module.css";

import img_spacebar from "./intro/spacebar.png";
import img_up from "./intro/up.png";
import img_down from "./intro/down.png";
import img_left from "./intro/left.png";
import img_right from "./intro/right.png";
import img_slider1 from "./intro/SliderExamplePicture1.png";
import img_slider2 from "./intro/SliderExamplePoint.png";
import img_slider3 from "./intro/SliderExampleLine.png";
import img_slider4 from "./intro/SliderExamplePicture2.png";
import img_slider5 from "./intro/SliderExamplePicture3.png";
import img_slider6 from "./intro/SliderExamplePicture4.png";
import img_slider7 from "./intro/SliderExamplePicture5.png";
/////////////////////////////////////////////////////////////////////////////////

class SliderIntro extends React.Component {
  constructor(props) {
    super(props);
    var currentDate = new Date(); // maybe change to local
    var timeString = currentDate.toTimeString();

    /////////////////////////////////////////////////////////////////////////////////
    // SET COMPONENT STATES

    this.state = {
      userID: this.props.location.state.userID,
      date: this.props.location.state.date,
      startTime: this.props.location.state.startTime,
      sectionTime: timeString,
      taskSession: "SliderIntro",
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
    } else if (whichButton === 5 && curText < 12) {
      this.setState({ instructScreenText: curText + 1 });
    } else if (curText === 12 && whichButton === 10) {
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
      pathname: `/SliderTraining`,
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
              <br />
              <span className={styles.center}>Welcome to our study!</span>
              <br />
              In the following game, you will use a special response slider.
              <br />
              With this slider you can indicate both <br />
              (1) a <strong>number</strong> we are asking for and <br />
              (2) how <strong>certain</strong> you are about this number.
              <br />
              <br />
              We will now show you how this slider works and give you a chance
              to get used to it.
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
              <span className={styles.center}>TRAINING I</span>
              <br />
              <br />
              When you make an estimate, such as how expensive something is,{" "}
              <br />
              you might be more or less certain about this estimate's accuracy.
              <br />
              <br />
              This means, sometimes you might be certain (sure) that your
              estimate is correct and <br />
              other times you might be very uncertain (unsure) about your
              estimate.
              <br />
              <br />
              <br /> <br />
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
              <span className={styles.center}>TRAINING I</span>
              <br />
              <br />
              For instance a scenario might be:
              <br />
              <br />
              <li>Your estimate:</li>
              “The ice cream will cost £2”
              <br />
              <br />
              <li>Your certainty in your estimate:</li>
              “I am very certain that the ice-cream will cost £2 <br />
              because this is what I paid last time I went to this shop”
              <br /> <br />
              or <br />
              <br />
              “I am very uncertain how much the ice-cream will cost <br />
              because I have never been to this shop before.”
              <br />
              <br />
              <br /> <br />
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
              This is the slider you will use:
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImg}
                  src={img_slider1}
                  alt="example1"
                />
              </span>
              <br />
              <br />
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
              The peak of this curve shows the estimate that you think is most
              likely:
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={img_slider2}
                  alt="example1"
                />
              </span>
              And the width of the slider shows how certain you are:
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={img_slider3}
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
              <span className={styles.center}>TRAINING I</span>
              You can move the position of the peak
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImg2}
                  src={img_slider2}
                  alt="example1"
                />
              </span>
              <br />
              to the left using the left arrow key
              <img
                className={styles.introImgTwo2}
                src={img_left}
                alt="example1"
              />
              <br />
              and to the right using the right arrow key
              <img
                className={styles.introImgTwo2}
                src={img_right}
                alt="example1"
              />
              <br />
              <br />
              <br />
              <span className={styles.center}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 7) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING I</span>
              You can make change the width as well.
              <br />
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImg2}
                  src={img_slider3}
                  alt="example1"
                />
              </span>
              <br />
              You can make the slider wider using the up arrow key
              <img
                className={styles.introImgTwo2}
                src={img_up}
                alt="example1"
              />{" "}
              <br /> <br />
              and narrower using the down arrow key
              <img
                className={styles.introImgTwo2}
                src={img_down}
                alt="example1"
              />
              <br />
              <br />
              <br />
              <span className={styles.center}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 8) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING I</span>
              <br />
              Here you see how it looks like when the estimate is 50
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={img_slider1}
                  alt="example1"
                />
              </span>
              and here you see how it looks like when it is 75
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={img_slider4}
                  alt="example1"
                />
              </span>
              <span className={styles.center}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 9) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING I</span>
              The second aspect of the slider, the changeable width, enables you
              to indicate your certainty.
              <br />
              Here you see how it looks like when the estimate is 50 with high{" "}
              <strong>certainty</strong>
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={img_slider5}
                  alt="example1"
                />
              </span>
              and here 50 is indicated with <strong>uncertainty</strong>
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo}
                  src={img_slider6}
                  alt="example1"
                />
              </span>
              <span className={styles.center}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 10) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING I</span>
              <br />
              <br />
              To familiarize you with the slider, we will now ask you several
              questions.
              <br />
              <br />
              Some questions are related to yourself and some are not.
              <br />
              <br />
              Please indicate your answer to the question and <br /> <br /> your
              certainty in your answer by using the slider.
              <br />
              <br />
              <br /> <br />
              <span className={styles.center}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 11) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING I</span>
              <br />
              One example could be:
              <br />
              <br />
              “How large is the population of Thailand? (If the scale refers to
              0-100 Million)”
              <br />
              <br />
              If you think it is approximately 65 mio and you are relatively
              certain,your answer could be:
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImg}
                  src={img_slider7}
                  alt="example1"
                />
              </span>
              <br />
              <br />
              <span className={styles.center}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </p>
          </div>
        );
      } else if (this.state.instructScreenText === 12) {
        text = (
          <div className={styles.main}>
            <p>
              <span className={styles.center}>TRAINING I</span>
              <br />
              When indicating your estimate and certainty, please try to do be
              as precise as possible.
              <br />
              <br />
              To submit your answer, please press the space bar.
              <br />
              <span className={styles.center}>
                <img
                  className={styles.introImgTwo3}
                  src={img_spacebar}
                  alt="example1"
                />
              </span>
              <br /> <br />
              Let's practice this!
              <br /> <br /> <br /> <br />
              Also press the [<strong>SPACEBAR</strong>] to start the practice.
              <br />
              <br />
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

export default withRouter(SliderIntro);
