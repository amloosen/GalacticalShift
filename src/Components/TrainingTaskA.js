import React from "react";
import { withRouter } from "react-router-dom";
// import { DATABASE_URL } from "./config";
import styles from "./style/taskStyle.module.css";
import { range } from "lodash";

import ElementsOneDisplay from "./elementsOnedisplay";
////////////////////////////////////////////////////////////////////////////////
// function shuffle(array) {
//   let currentIndex = array.length,
//     randomIndex;
//
//   // While there remain elements to shuffle...
//   while (currentIndex !== 0) {
//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;
//
//     // And swap it with the current element.
//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
// //   }
//
//   return array;
// }
/////////////////////////////////////////////////////////////////////////////////

class TrainingTaskA extends React.Component {
  constructor(props) {
    super(props);

    var nr_train_a_trial = 10;
    var val_options = range(0, 110, 10);
    var random_val = [];
    for (var i = 0; i <= nr_train_a_trial - 1; i++) {
      var val_tmp = val_options[~~(Math.random() * val_options.length)];
      do {
        var val_tmp = val_options[~~(Math.random() * val_options.length)];
      } while (random_val[i - 1] === val_tmp); // make sure it changes color every time
      random_val[i] = val_tmp;
    }
    var rightCodeAns = [4, 4, 4, 4, 4, 5, 5, 5, 5];
    // var corr_pos = [1, 2]; //1 is left and 2 is right
    // shuffle(corr_pos);
    // console.log(corr_pos);

    let array_tmp = Array(nr_train_a_trial).fill(0);

    this.state = {
      // userID: userID,
      // date: date,
      // startTime: startTime,
      // sectionTime: timeString,
      // taskSessionTry: 1,
      // taskSession: "TrainingTaskA",
      trialKeypress: array_tmp,
      traintrialNum: 1,
      traintrialTotal: nr_train_a_trial,
      feedback: 0,
      timePassed: false,
      timePassed2: false,
      mounted: 0,
      valTrainElem: random_val[0],
      corr_value: random_val[0],
      all_values: random_val,
      trainAcc: array_tmp,
      ansOne: 100 - random_val[0],
      ansTwo: random_val[0],
      all_corrAns: rightCodeAns,
    };

    this.nextTrial = this.nextTrial.bind(this);
    this.trainCheck = this.trainCheck.bind(this);
    this.disp_options = this.disp_options.bind(this);
    this.disp_feedback = this.disp_feedback.bind(this);
    /* prevents page from going to the right/left when arrows are pressed .*/
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 37 && e.target === document.body) {
        e.preventDefault();
      } else if (e.keyCode === 39 && e.target === document.body) {
        e.preventDefault();
      }
    });
  }

  /////////////////////////////////////////////////////////////////////////////////
  trainCheck(pressed) {
    var corrAns = this.state.all_corrAns[this.state.traintrialNum - 1];
    var trainAcc = this.state.trainAcc;

    if (pressed === corrAns) {
      trainAcc[this.state.traintrialNum - 1] = 1;
    } else {
      trainAcc[this.state.traintrialNum - 1] = 0;
    }

    this.setState({
      trialKeypress: pressed,
      trainAcc: trainAcc,
      corrAns: corrAns,
      feedback: 1,
    });
  }

  _handleTrainKey = (event) => {
    var pressed;
    switch (event.keyCode) {
      case 37:
        //    this is left arrow
        pressed = 4;
        this.trainCheck(pressed);
        break;
      case 39:
        //    this is right arrow
        pressed = 5;
        this.trainCheck(pressed);
        break;
      default:
    }
  };

  nextTrial() {
    document.removeEventListener("keyup", this._handleTrainKey);
    var traintrialNum_tmp = this.state.traintrialNum + 1;
    var valTrainElem_tmp = this.state.all_values[traintrialNum_tmp - 1];

    if (traintrialNum_tmp <= 5) {
      var corr_value_tmp = valTrainElem_tmp;
      var   ansOne_tmp = 100 - this.state.all_values[traintrialNum_tmp - 1];
      var   ansTwo_tmp = this.state.all_values[traintrialNum_tmp - 1]
    } else {
      var corr_value_tmp = 100 - valTrainElem_tmp;
      var   ansTwo_tmp = 100 - this.state.all_values[traintrialNum_tmp - 1];
      var   ansOne_tmp = this.state.all_values[traintrialNum_tmp - 1]
    }

    this.setState({
      traintrialNum: traintrialNum_tmp,
      feedback: 0,
      timePassed: false,
      timePassed2: false,
      valTrainElem: valTrainElem_tmp,
      corr_value: corr_value_tmp,
      ansTwo: ansTwo_tmp,
      ansOne: ansOne_tmp
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    //send the outcomeTask conditions?

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
  //
  //   fetchUserInfo () {
  //        fetch(`${API_URL}/questions_behaviour/last_user_no`)
  //          .then(handleResponse)
  //          .then((data) => {
  //            const user_no_ = parseInt(data['new_user_no'])
  //            //console.log("fetchUserInfo in Intro ", "user_no", user_no_)
  //
  //            this.setState({
  //                    UserNo : user_no_,
  //                    fetched: 1,
  //                });
  //        })
  //          .catch((error) => {
  //           console.log(error)
  //        });
  //       }

  // setTimeout(
  //   function () {
  //     this.trainTrialSave();
  //   }.bind(this),
  //   5
  // );
  /////////////////////////////////////////////////////////////////////////////////
  render() {
    if (!this.state.timePassed && this.state.feedback === 0) {
      return <div className={styles.cockpit}>{this.disp_element()}</div>;
    } else if (this.state.feedback === 0 && this.state.timePassed === true) {
      return <div className={styles.cockpit}>{this.disp_options()}</div>;
    } else if (!this.state.timePassed2 && this.state.feedback === 1){
      return <div className={styles.cockpit}>{this.disp_feedback()}</div>;
    } else if (this.state.timePassed2 === true && this.state.feedback === 1){{this.nextTrial()} return null}
  }

disp_element(event) {
  setTimeout(() => {
    this.setState({ timePassed: true, timePassed2: false });
  }, 1700);
    return (
      <ElementsOneDisplay
        value={this.state.valTrainElem}
        traintrialTotal={this.state.traintrialTotal}
        traintrialNum={this.state.traintrialNum}
      />
    );
}


  disp_options(event) {
    document.addEventListener("keyup", this._handleTrainKey);
    let text = (
      <div className={styles.questions}>
        How large is the alien population?
        <br />
        <br />
        <br />
      </div>
    );
    return (
      <div className={styles.cockpit}>
        <div>{text}</div>
        <br />
        <div className={styles.main}>
          <div className={styles.container_1}>
            <span className={styles.right}>{this.state.ansTwo}</span>
            <span className={styles.left}>{this.state.ansOne}</span>
          </div>
          <br />
        </div>
      </div>
    );
  }

  disp_feedback() {
    let text2 = (
      <div className={styles.questions}>
        The true population on the planet was {this.state.corr_value} mio.
        <br />
        <br />
        <br />
      </div>
    );
    setTimeout(() => {
      this.setState({timePassed2: true });
    }, 700);

    return (
      <div className={styles.cockpit}>
        <div>{text2}</div>
      </div>
    );

  }
}
/////////////////////////////////////////////////////////////////////////////////

export default withRouter(TrainingTaskA);
