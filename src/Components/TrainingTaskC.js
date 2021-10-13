import React from "react";
import { withRouter } from "react-router-dom";
// import { API_URL } from "./config";
import styles from "./style/taskStyle.module.css";
import DispSlider from "./DisplaySlider";
import DisplayTrainElements from "./DisplayTrainElements";
import DispFeedback from "./DisplayFeedback";
import DispBreak from "./DisplayBreak";
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
class TrainingTaskC extends React.Component {
  constructor(props) {
    super(props);

    var randNum = "trainstruct_" + getRandomInt(1, 10);
    var StructToRender = require("./trainStructs/" + randNum + ".json");
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

    var nr_traintrial = w0.length;
    //pregenerate the values of the remaining elements
    var check_al2 = [];
    var check_al1 = [];

    for (var i = 0; i <= nr_traintrial - 1; i++) {
      var restricted = [val_corr_elem[i], 100 - val_corr_elem[i]];
      if (i < nr_traintrial / 2) {
        check_al1[i] = getRand(restricted);
        check_al2[i] = 100 - val_corr_elem[i];
      } else {
        check_al1[i] = 100 - val_corr_elem[i];
        check_al2[i] = getRand(restricted);
      }
    }

    var all_element_values = Array(nr_traintrial)
      .fill()
      .map(() => Array(3).fill(0));

    for (var j = 0; j <= nr_traintrial - 1; j++) {
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

    let traintrialSgmMu = Array(nr_traintrial)
      .fill()
      .map(() => Array(3).fill(0));
    let traintrialRT = Array(nr_traintrial)
      .fill()
      .map(() => Array(3).fill(0));
    let indicKey_tmp = Array(nr_traintrial)
      .fill()
      .map(() => Array(2).fill(0));

    let array_tmp = Array(nr_traintrial).fill(0);
    let indicReq_tmp = Array(nr_traintrial).fill(0);

    for (var k = 5; k <= nr_traintrial - 1; k += 20) {
      indicReq_tmp[k] = 1;
    }

    var times_element1 = Array(nr_traintrial)
      .fill()
      .map(() => Array(3).fill(0));
    var times_element2 = Array(nr_traintrial)
      .fill()
      .map(() => Array(3).fill(0));
    var times_element3 = Array(nr_traintrial)
      .fill()
      .map(() => Array(3).fill(0));

    var outcomeHeight_tmp = Array(nr_traintrial).fill(0);

    var element_colours = [1, 2, 3];
    shuffle(element_colours);

    var currentDate = new Date();
    var TrainCStartTime = currentDate.toTimeString();

    this.state = {
      // userID: this.props.userID,
      date: currentDate,
      // startTime: this.props.startTime,
      sectionStartTime: TrainCStartTime,
      taskSession: "TrainingTaskC",
      traintrialTotal: nr_traintrial,
      traintrialPerBlock: 50,
      traintrialNum: 1,
      traintrialtrainblockNum: 1,
      trainblockTotal: 5,
      trainblockNum: 1,
      indicReq: indicReq_tmp,
      indicKey: indicKey_tmp,
      traintrialRT: traintrialRT,
      choiceTime0: 0,
      element1Col: element_colours[0],
      element2Col: element_colours[1],
      element3Col: element_colours[2],
      times_element1: times_element1,
      times_element2: times_element2,
      times_element3: times_element3,
      traintrialSgmMu: traintrialSgmMu,
      outcomeHeight: outcomeHeight_tmp,
      break: 0,
      all_true_pop_size: true_pop_size,
      all_element_values: all_element_values,
      disp_el: 1,
      disp_slider: 0,
      startMu: 50,
      startSgm: 30,
      corr_elements:corPos_sq
    };

    //* prevents page from going to the right/left when arrows are pressed .*/
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 37 && e.target === document.body) {
        e.preventDefault();
      } else if (e.keyCode === 39 && e.target === document.body) {
        e.preventDefault();
      }
    });
  }
  /////////////////////////////////////////////////////////////////////////////////
  // componentDidMount() {
  //   // if (this.state.traintrialtrainblockNum===this.state.traintrialPerBlock){
  //   //   this.sendBlock(this.state.userID, this.state.BlockNo)
  //   // }
  // }
  // //
  // componentWillUnmount() {
  //   //
  // }
  //
  // sendBlock(user_no_, block_no_) {
  //   // var currentDate   = new Date();
  //   // var BlockFinishTime    = currentDate.toTimeString();
  //   // let traintrial_per_block = this.state.traintrial_per_block;
  //   // let ind_block = block_no_-1;
  //   //
  //   // var subset_Horizon = this.state.block_info.Horizon.slice(0,traintrial_per_block);
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
    if (this.state.disp_el === 1) {
      return (
        <DisplayTrainElements
          element1Col={this.state.element1Col}
          element2Col={this.state.element2Col}
          element3Col={this.state.element3Col}
          all_element_values={this.state.all_element_values}
          corr_elem={this.state.corr_elements[this.state.traintrialNum-1]}
          indicReq={this.state.indicReq}
          trialNum={this.state.traintrialNum}
          onElementsEnd={this.handleElementsData}
          onElementsIndic={this.handleIndicData}
        />
      );
    } else if (this.state.disp_slider === 1) {
      return (
        <DispSlider
          trialSgmMu={this.state.traintrialSgmMu}
          trialRT={this.state.traintrialRT}
          trialNum={this.state.traintrialNum}
          onSliderEnd={this.handleSliderData}
          startSgm={this.state.startSgm}
          startMu={this.state.startMu}
        />
      );
    } else if (this.state.disp_feedback === 1) {
      return (
        <DispFeedback
          element1Col={this.state.element1Col}
          element2Col={this.state.element2Col}
          element3Col={this.state.element3Col}
          all_element_values={this.state.all_element_values}
          all_true_pop_size={this.state.all_true_pop_size}
          trialSgmMu={this.state.traintrialSgmMu}
          indicReq={this.state.indicReq}
          trialNum={this.state.traintrialNum}
          onFeedbackEnd={this.handleOutcomeData}
        />
      );
    } else if (
      this.state.traintrialPerBlock === this.state.traintrialPerBlock &&
      this.state.BlockNo < this.state.trainblockTotal
    ) {
      return (
        <DispBreak
          trainblockTotal={this.state.trainblockTotal}
          trainblockNum={this.state.trainblockNum}
          onBreakEnd={this.handleBreak}
        />
      );
    }
  }
  /////////////////////////////////////////////////////////////////////////////////
  handleElementsData = (times_element1, times_element2, times_element3) => {
    var times_element1_tmp = this.state.times_element1;
    var times_element2_tmp = this.state.times_element2;
    var times_element3_tmp = this.state.times_element3;
    times_element1_tmp[this.state.traintrialNum - 1] = times_element1;
    times_element2_tmp[this.state.traintrialNum - 1] = times_element2;
    times_element3_tmp[this.state.traintrialNum - 1] = times_element3;
    this.setState({
      times_element1: times_element1_tmp,
      times_element2: times_element2_tmp,
      times_element3: times_element3_tmp,
      disp_el: 0,
      disp_slider: 1,
    });
  };

  handleSliderData = (traintrialSgmMu, traintrialRT) => {
    this.setState({
      traintrialSgmMu: traintrialSgmMu,
      traintrialRT: traintrialRT,
      disp_slider: 0,
      disp_feedback: 1,
    });
  };

  handleIndicData = (pressed) => {
    var indicKey_tmp = this.state.indicKey;
    indicKey_tmp[this.state.traintrialNum - 1][1] = this.state.traintrialNum;
    indicKey_tmp[this.state.traintrialNum - 1][2] = pressed;
    this.setState({
      indicKey: indicKey_tmp,
      disp_el: 0
    });
  };

  handleOutcomeData = (height) => {
    var outcomeHeight_tmp = this.state.outcomeHeight;
    outcomeHeight_tmp[this.state.traintrialNum - 1] = height;
    this.nextTrial(0,outcomeHeight_tmp);
  };

  handleBreak = (breakEnd) => {
    this.nextTrial(1,0);
  };

  nextTrial = (b,h) => {
    if (b === 1) {
      var block_tmp = this.state.trainblockNum + 1;
      var traintrialtrainblockNum_tmp = 1;
      var traintrialNum_tmp = this.state.traintrialNum + 1;
      this.setState({
        traintrialNum: traintrialNum_tmp,
        trainblockNum: block_tmp,
        traintrialtrainblockNum: traintrialtrainblockNum_tmp,
      });
    }
    if (this.state.traintrialNum === this.state.traintrialTotal) {
      this.redirectToNextStage();
    } else {
      var traintrialNum_tmp = this.state.traintrialNum + 1;
      var traintrialtrainblockNum_tmp = this.state.traintrialtrainblockNum + 1;
      debugger;
      this.setState({
        traintrialNum: traintrialNum_tmp,
        traintrialtrainblockNum: traintrialtrainblockNum_tmp,
        height: h,
        disp_feedback: 0,
        disp_el:1
      });
    }
  };

  redirectToNextStage() {
    this.props.history.push({
      pathname: `/MainTaskIntro`,
      state: {
        // userID: this.state.userID,
        // date: this.state.date,
        // startTime: this.state.startTime,
      },
    });
  }
}

export default withRouter(TrainingTaskC);
