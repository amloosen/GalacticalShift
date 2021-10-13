import React from "react";
import { withRouter } from "react-router-dom";
import { API_URL } from '../config.js';
import styles from "./style/taskStyle.module.css";
/////////////////////////////////////////////////////////////////////
class EndPage extends React.Component {
  constructor(props) {
    super(props);

    // const userID = this.props.location.state.userID;
    // const date = this.props.location.state.date;
    // const startTime = this.props.location.state.startTime;
    // const bonus = this.props.location.state.bonus;

    // This will change for the questionnaires going AFTER the main task
    this.state = {
      // userID: userID,
      // date: date,
      // startTime: startTime,
      instructScreenText: 1,
      instructScreen: true,
      feedback: [],
      bonus: 2,
      placeholder:
        "Were the task instructions clear? Did you encounter any problems?",
      // bonus: bonus,


    };

    this.handleInstructLocal = this.handleInstructLocal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInstructLocal(key_pressed) {
    var curText = this.state.instructScreenText;
    var whichButton = key_pressed;

    if (whichButton === 4 && curText > 1 && curText <= 3) {
      this.setState({ instructScreenText: curText - 1 });
    } else if (whichButton === 5 && curText < 3) {
      this.setState({ instructScreenText: curText + 1 });
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

  // for the feedback box
  handleChange(event) {
    this.setState({ feedback: event.target.value });
  }

  handleSubmit(event) {
    var userID = this.state.userID;

    let saveString = {
      userID: this.state.userID,
      date: this.state.date,
      startTime: this.state.startTime,
      feedback: this.state.feedback,
    };

    // try {
    //   fetch(`${API_URL}/feedback/` + userID, {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(saveString),
    //   });
    // } catch (e) {
    //   console.log("Cant post?");
    // }

    alert("Thanks for your feedback!");
    event.preventDefault();

    setTimeout(
      function () {
        this.clearFb();
      }.bind(this),
      10
    );
  }

  clearFb() {
    this.setState({ feedback: [], placeholder: "Thanks for your feedback!" });
  }

  openInNewTab(url) {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    let text;

    if (this.state.instructScreen === true) {
      if (this.state.instructScreenText === 1) {
        document.addEventListener("keyup", this._handleInstructKey);
        text = (
          <div className={styles.main}>
            <span className={styles.likeP}>
              <span className={styles.center}>THANK YOU</span>
              <br />
              Well done, you have earned £{this.state.bonus} as a bonus!
              <br /> <br />
              Thanks for your help!
              <br />
              <br />
              Your data makes an important contribution to our understanding of
              mental health.
              <br />
              <br />
              In this study, we were interested in how you detect complex associations and how you react when they change.
              <br /> <br />
              Previous work have linked differences in behaviour to psychiatric
              disorders, which we are aiming to understand better.
              <br />
              <br />
              <span className={styles.centerTwo}>
                [<strong>NEXT →</strong>]
              </span>
            </span>
          </div>
        );
      } else if (this.state.instructScreenText === 2) {
        text = (
          <div className={styles.main}>
            <span className={styles.likeP}>
              <span className={styles.center}>THANK YOU</span>
              <br />
              If you feel that completing the questionnaires on any of the
              psychopathologies caused <br />
              you any distress, please use the following contact details for
              help and support.
              <br />
              <br />
              <i>Web page links (click to open in new tab):</i>
              <ul>
                <li>
                  <span
                    onClick={() => {
                      this.openInNewTab(
                        "https://www.nhs.uk/conditions/stress-anxiety-depression/mental-health-helplines/"
                      );
                    }}
                  >
                    <u>NHS Mental Health Helplines</u>
                  </span>
                </li>
                <br />
                <li>
                  <span
                    onClick={() => {
                      this.openInNewTab("https://www.anxietyuk.org.uk");
                    }}
                  >
                    <u>Anxiety UK</u>
                  </span>
                  &nbsp; (Helpline: 03444 775 774)
                </li>
                <br />
                <li>
                  <span
                    onClick={() => {
                      this.openInNewTab("https://www.ocduk.org/");
                    }}
                  >
                    <u>OCD UK</u>
                  </span>
                  &nbsp; (Helpline: 0333 212 7890)
                </li>
                <br />
                <li>
                  <span
                    onClick={() => {
                      this.openInNewTab("https://www.samaritans.org/");
                    }}
                  >
                    <u>Samaritans</u>
                  </span>
                  &nbsp; (Helpline: 116 123)
                </li>
              </ul>
              <span className={styles.centerTwo}>
                [<strong>← BACK</strong>] [<strong>NEXT →</strong>]
              </span>
            </span>
          </div>
        );
      } else if (this.state.instructScreenText === 3) {
        text = (
          <div className={styles.main}>
            <span className={styles.likeP}>
              <span className={styles.center}>THANK YOU</span>
              <br />
              We would love to hear any comments you have about the tasks you
              have completed.
              <br /> <br />
              If you have any, please fill in the box below and click submit.
              <span className={styles.centerThree}>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    <textarea
                      rows="5"
                      cols="50"
                      placeholder={this.state.placeholder}
                      value={this.state.feedback}
                      onChange={this.handleChange}
                    />
                  </label>
                  <br />
                  <input type="submit" value="Submit" />
                </form>
              </span>
              <span className={styles.centerTwo}>
                If you are ready to return to Prolific, press [
                <strong>SPACEBAR</strong>] and follow the pop-up to complete the
                session.
              </span>
              &nbsp;
              <span className={styles.centerTwo}>
                [← <strong>BACK</strong>]
              </span>
            </span>
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

export default withRouter(EndPage);
