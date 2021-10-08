import React from "react";
import { withRouter } from "react-router-dom";
// import { DATABASE_URL } from "./config";
import styles from "./style/taskStyle.module.css";
import DispSlider from "./DisplaySlider";
import DispElements from "./DisplayElements";

import { View } from "react-native";
import OutcomeSlider from "./SliderOutcome";
import OutcomeSliderBar from "./SliderOutcomeBar";
import { range } from "lodash";
////////////////////////////////////////////////////////////////////////////////
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
//
function getRandomInt(min, max) {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);

  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function getRand(array) {
  var val_options = range(0, 110, 10);
  var rand = val_options[~~(Math.random() * val_options.length)];
  // var rand = Math.floor(Math.random() * 10);
  if (array.indexOf(rand) === -1) {
    return rand;
  } else {
    return getRand(array);
  }
}
/////////////////////////////////////////////////////////////////////////////////
class MainTask extends React.Component {
  constructor(props) {
    super(props);

    var randNum = "struct_" + getRandomInt(1, 10);
    var StructToRender = require("./taskStructs/" + randNum + ".json");
    var precededShift = StructToRender[0]; //1=intra-dimensional; 2=extra-dimensional
    var w0 = StructToRender[1];
    var relevant_w = StructToRender[2];
    var corPos_sq = StructToRender[3];
    var val_corr_elem = StructToRender[4];
    var epsilon = StructToRender[5];
    var true_pop_size_tmp = StructToRender[6];
    var true_pop_size = true_pop_size_tmp.map(function (each_element) {
      return Number(each_element.toFixed(0));
    });

    var nr_trial = w0.length;
    //pregenerate the values of the remaining elements
    var check_al2 = [];
    var check_al1 = [];

    for (var i = 0; i <= nr_trial - 1; i++) {
      var restricted = [val_corr_elem[i], 100 - val_corr_elem[i]];
      if (i < nr_trial / 2) {
        check_al1[i] = getRand(restricted);
        check_al2[i] = 100 - val_corr_elem[i];
      } else {
        check_al1[i] = 100 - val_corr_elem[i];
        check_al2[i] = getRand(restricted);
      }
    }

    var all_element_values = Array(nr_trial)
      .fill()
      .map(() => Array(3).fill(0));

    for (var j = 0; j <= nr_trial - 1; j++) {
      all_element_values[j][corPos_sq[j] - 1] = val_corr_elem[j];
      if (corPos_sq[j] === 1) {
        all_element_values[j][1] = check_al1[j];
        all_element_values[j][2] = check_al2[j];
      } else if (corPos_sq[j] === 2) {
        all_element_values[j][0] = check_al1[j];
        all_element_values[j][2] = check_al2[j];
      } else if (corPos_sq[j] === 3) {
        all_element_values[j][0] = check_al1[j];
        all_element_values[j][1] = check_al2[j];
      }
    }

    let trialSgmMu = Array(nr_trial)
      .fill()
      .map(() => Array(3).fill(0));
    let trialRT = Array(nr_trial)
      .fill()
      .map(() => Array(3).fill(0));
    let indicKey_tmp = Array(nr_trial)
      .fill()
      .map(() => Array(2).fill(0));

    let array_tmp = Array(nr_trial).fill(0);
    let indicReq_tmp = Array(nr_trial).fill(0);

    for (var k = 5; k <= nr_trial - 1; k += 20) {
      indicReq_tmp[k] = 1;
    }

    var times_element1 = Array(nr_trial)
      .fill()
      .map(() => Array(3).fill(0));
    var times_element2 = Array(nr_trial)
      .fill()
      .map(() => Array(3).fill(0));
    var times_element3 = Array(nr_trial)
      .fill()
      .map(() => Array(3).fill(0));

    var element_colours = [1, 2, 3]; // from left to right
    shuffle(element_colours);

    var currentDate = new Date();
    var MainStartTime = currentDate.toTimeString();

    this.state = {
      // userID: this.props.userID,
      date: currentDate,
      // startTime: this.props.startTime,
      sectionStartTime: MainStartTime,
      taskSession: "MainTask",
      trialTotal: nr_trial,
      trialPerBlock: 50,
      trialNum: 1,
      trialBlockNum: 1,
      blockTotal: 5,
      blockNum: 1,
      indicReq: indicReq_tmp,
      indicKey: indicKey_tmp,
      trialRT: trialRT,
      choiceTime0: 0,
      element1Col: element_colours[0],
      element2Col: element_colours[1],
      element3Col: element_colours[2],
      times_element1: times_element1,
      times_element2: times_element2,
      times_element3: times_element3,
      trialSliderRT: null,
      trialSgmMu: trialSgmMu,
      timerCountDur: 10,
      feedback: false,
      mounted: 0,
      timePassed: false,
      timePassed2: false,
      all_true_pop_size: true_pop_size,
      trainAcc: array_tmp,
      corr_elem_pos: corPos_sq,
      all_element_values: all_element_values,
    };
    // this.displayFeedback = this.displayFeedback.bind(this)
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
  _handleBreakKey = (event) => {
    if (event.keyCode === 32) {
      this.nextTrial(2);
    }
  };

  nextTrial(event, pressed) {
    if (event === 2) {
    } else if (event === 0) {
      if (this.state.trialNum === this.state.trialTotal) {
        this.redirectToNextStage();
      } else {
        if (this.state.trialBlockNum === this.state.trialPerBlock) {
          var block_tmp = this.state.blockNum + 1;
          var trialBlockNum_tmp = 1;
        } else {
          var trialBlockNum_tmp = this.state.trialBlockNum + 1;
        }

        var trialNum_tmp = this.state.trialNum + 1;
        this.setState({
          trialNum: trialNum_tmp,
          blockNum: block_tmp,
          trialBlockNum: trialBlockNum_tmp,
          feedback: false,
          timePassed: false,
          timePassed2: false,
        });
      }
    }
  }

  componentDidMount() {
    // setTimeout(
    //   function () {
    //     this.setState({
    //       mounted: 1,
    //     });
    //   }.bind(this),
    //   5000
    // );
  }

  componentWillUnmount() {
    // this.setState = (state, callback) => {
    //   return;
    // };
  }
  //
  // sendBlock(user_no_, block_no_) {
  //   // var currentDate   = new Date();
  //   // var BlockFinishTime    = currentDate.toTimeString();
  //   // let trial_per_block = this.state.trial_per_block;
  //   // let ind_block = block_no_-1;
  //   //
  //   // var subset_Horizon = this.state.block_info.Horizon.slice(0,trial_per_block);
  //
  //   let behaviour = {
  //     BlockNo: block_no_,
  //     //                         'Date'                : this.props.user_info.date,
  //     //                         'UserStartTime'       : this.props.user_info.startTime,
  //   };

  // fetch(`${API_URL}/behaviour/` + user_no_ + `/` + block_no_, {
  //    method: 'POST',
  //    headers: {
  //      'Accept': 'application/json',
  //      'Content-Type': 'application/json',
  //    },
  //    body: JSON.stringify(behaviour)
  //  })
  // }
  /////////////////////////////////////////////////////////////////////////////////
  render() {
    // if (!this.state.timePassed && this.state.feedback === false) {
    return (
      <DispElements
        element1Col={this.state.element1Col}
        element2Col={this.state.element2Col}
        element3Col={this.state.element3Col}
        all_element_values={this.state.all_element_values}
        indicReq={this.state.indicReq}
        trialNum={this.state.trialNum}
        onElementsEnd={this.handleElementsData}
        onElementsIndic={this.handleIndicData}
      />
    );
    // } else if (this.state.feedback === true && !this.state.timePassed2) {
    //   return (
    //     <div className={styles.cockpit}>
    //       {this.disp_feedback()} {this.handleIncrement}{" "}
    //     </div>
    //   );
    // } else if (!this.state.feedback && this.state.timePassed2 === false) {
    // return (
    //   <DispSlider
    //     trialSgmMu={this.state.trialSgmMu}
    //     trialRT={this.state.trialRT}
    //     trialNum={this.state.trialNum}
    //     onSliderEnd={this.handleSliderData}
    //   />
    // );
    // } else if (
    //   this.state.timePassed2 === true &&
    //   this.state.feedback === true
    // ) {
    //   if (
    //     this.state.trialBlockNum === this.state.trialPerBlock &&
    //     this.state.blockNum < this.state.blockTotal
    //   ) {
    //     return (
    //       <div className={styles.cockpit}>
    //         {this.disp_break(this.state.blockNum, this.state.blockTotal)}
    //       </div>
    //     );
    //   } else if (this.state.trialBlockNum === this.state.trialPerBlock) {
    //     this.sendBlock(this.props.UserNo, this.state.blockNum);
    //   }
    //   {
    //     this.nextTrial(0);
    //   }
    //   return null;
    // }
  }

  /////////////////////////////////////////////////////////////////////////////////
  // disp_feedback() {
  //   let text2 = (
  //     <div className={styles.questions}>
  //       The true population on the planet was{" "}
  //       {this.state.all_true_pop_size[this.state.trialNum - 1]} million.
  //       <br />
  //       <br />
  //       <br />
  //     </div>
  //   );
  //
  //   setTimeout(() => {
  //     this.setState({ timePassed2: true, timePassed: false });
  //   }, 700);
  //
  //   return (
  //     <div className={styles.cockpit}>
  //       <div>{text2}</div>
  //       <View style={styles.container}>
  //         <div className={styles.overlaybar}>
  //           <OutcomeSlider
  //             mu={this.state.trialSgmMu[this.state.trialNum - 1][2]}
  //             sgm={this.state.trialSgmMu[this.state.trialNum - 1][1]}
  //           />
  //         </div>
  //         <div className={styles.overlaybar}>
  //           <OutcomeSliderBar
  //             mu={this.state.trialSgmMu[this.state.trialNum - 1][2]}
  //             sgm={this.state.trialSgmMu[this.state.trialNum - 1][1]}
  //             value={this.state.all_true_pop_size[this.state.trialNum - 1]}
  //           />
  //         </div>
  //       </View>
  //     </div>
  //   );
  // }

  handleElementsData = (times_element1, times_element2, times_element3) => {

    var times_element1_tmp = this.state.times_element1;
    var times_element2_tmp = this.state.times_element2;
    var times_element3_tmp = this.state.times_element3;
    times_element1_tmp[this.state.trialNum - 1] = times_element1;
    times_element2_tmp[this.state.trialNum - 1] = times_element2;
    times_element3_tmp[this.state.trialNum - 1] = times_element3;

    this.setState({
      times_element1: times_element1_tmp,
      times_element2: times_element2_tmp,
      times_element3: times_element3_tmp
    });
  };

  handleSliderData = (trialSgmMu, trialRT) => {
    this.setState({
      trialSgmMu: trialSgmMu,
      trialRT: trialRT,
      feedback: true
    });
  };

  handleIndicData = (pressed) => {
    var indicKey_tmp = this.state.indicKey;
    indicKey_tmp[this.state.trialNum - 1][1] = this.state.trialNum;
    indicKey_tmp[this.state.trialNum - 1][2] = pressed;
    this.setState({
      indicKey: indicKey_tmp
    });
  };

  disp_break(blockNum, blockTotal) {
    document.addEventListener("keyup", this._handleBreakKey);
    let text = (
      <div className={styles.main}>
        <p>
          <span className={styles.center}>BREAK</span>
          <br />
          <br />
          You have completed {blockNum} out of&nbsp;
          {blockTotal} blocks!
          <br />
          <br />
          You may take a short break.
          <br />
          <br />
          You should take the opportunity to refresh your memory of the room and
          outcome images.
          <br />
          <br />
          <span className={styles.centerTwo}>
            If you are ready to continue, please press the [
            <strong>SPACEBAR</strong>].
          </span>
        </p>
      </div>
    );

    return (
      <div className={styles.cockpit}>
        <div className={styles.textblock}>
          {text} {this.handleBreakKey}
        </div>
      </div>
    );
  }

  redirectToNextStage() {
    this.props.history.push({
      pathname: `/EndPage`,
      state: {
        // userID: this.state.userID,
        // date: this.state.date,
        // startTime: this.state.startTime,
        //rewardTotal:
      },
    });

    // console.log("UserID is: " + this.state.userID);
  }
}

export default withRouter(MainTask);
