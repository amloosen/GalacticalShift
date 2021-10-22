import React from "react";
import { withRouter } from "react-router-dom";
import { API_URL } from "../config";
import styles from "./style/taskStyle.module.css";
import { range } from "lodash";
import DisplayElements from "./DisplayElements";
import DisplayTrainOptions from "./DisplayTrainOptions";
import DisplayTrainFeedback from "./DisplayTrainFeedback";
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

function getRand(array) {
  var val_options = range(0, 110, 10);
  var rand = val_options[~~(Math.random() * val_options.length)];
  if (array.indexOf(rand) === -1) {
    return rand;
  } else {
    return getRand(array);
  }
}

////////////////////////////////////////////////////////////////////////////////
class TrainingTaskB extends React.Component {
  constructor(props) {
    super(props);
    var currentDate = new Date(); // maybe change to local
    var timeString = currentDate.toTimeString();

    var nr_traintrial = 12;
    var val_options = range(0, 110, 10);
    val_options.splice(val_options.indexOf(50), 1); //remove the 50 to make it clearer which element is correct
    var random_val = [];
    for (var i = 0; i <= nr_traintrial - 1; i++) {
      var val_tmp = val_options[~~(Math.random() * val_options.length)];
      do {
        var val_tmp = val_options[~~(Math.random() * val_options.length)];
      } while (random_val[i - 1] === val_tmp); // make sure it changes every time
      random_val[i] = val_tmp;
    }

    var corr_values = random_val.slice(0, 6);
    var inverse_tmp = random_val.slice(6, 12);
    var inverse = inverse_tmp.map(function (value) {
      return 100 - value;
    });
    corr_values.push(
      inverse[0],
      inverse[1],
      inverse[2],
      inverse[3],
      inverse[4],
      inverse[5]
    );
    let array_tmp = Array(nr_traintrial).fill(0);

    var corr_pos = [4, 4, 4, 4, 4, 5, 5, 5, 5, 5]; //1 is left and 2 is right; determine where the correct value is displayed
    shuffle(corr_pos);
    // initialize options for the first trial
    if (corr_pos[0] === 4) {
      var ansOne = corr_values[0];
    } else {
      var ansTwo = corr_values[0];
    }

    var corr_elem_tmp = [1, 2, 3]; //1 is left and 2 is right; determine where the correct value is displayed
    shuffle(corr_elem_tmp);
    var corr_elem = Array(nr_traintrial).fill(0);

    for (var i = 0; i <= nr_traintrial - 1; i++) {
      if (i < nr_traintrial / 3) {
        corr_elem[i] = corr_elem_tmp[0];
      } else if (i >= nr_traintrial / 3 && i < (nr_traintrial / 3) * 2) {
        corr_elem[i] = corr_elem_tmp[1];
      } else {
        corr_elem[i] = corr_elem_tmp[2];
      }
    }
    //pregenerate the values for all elements
    var check_al2 = [];
    var check_al1 = [];

    for (var i = 0; i <= nr_traintrial - 1; i++) {
      var restricted = [corr_values[i], 100 - corr_values[i]];
      if (i < nr_traintrial / 2) {
        check_al1[i] = getRand(restricted);
        var restrictedsecond = [
          corr_values[i],
          100 - corr_values[i],
          check_al1[i],
        ];
        check_al2[i] = getRand(restrictedsecond);
      } else {
        var restrictedsecond = [
          corr_values[i],
          100 - corr_values[i],
          check_al1[i],
        ];
        check_al2[i] = getRand(restricted);
        check_al1[i] = getRand(restrictedsecond);
      }
    }

    var all_element_values = Array(nr_traintrial)
      .fill()
      .map(() => Array(3).fill(0));

    for (var i = 0; i <= nr_traintrial - 1; i++) {
      all_element_values[i][corr_elem[i] - 1] = corr_values[i];
      if (corr_elem[i] === 1) {
        all_element_values[i][1] = check_al1[i];
        all_element_values[i][2] = check_al2[i];
      } else if (corr_elem[i] === 2) {
        all_element_values[i][0] = check_al1[i];
        all_element_values[i][2] = check_al2[i];
      } else if (corr_elem[i] === 3) {
        all_element_values[i][0] = check_al1[i];
        all_element_values[i][1] = check_al2[i];
      }
    }

    // initialize options for the first trial
    if (corr_pos[0] === 4) {
      var ansTwo = 100 - corr_values[0];
      var ansOne = corr_values[0];
    } else {
      var ansOne = 100 - corr_values[0];
      var ansTwo = corr_values[0];
    }

    let indicReq_tmp = Array(nr_traintrial)
      .fill()
      .map(() => Array(2).fill(0));

    this.state = {
      sectionTime: timeString,
      userID: this.props.location.state.userID,
      date: this.props.location.state.date,
      startTime: this.props.location.state.startTime,
      taskSession: "TrainingTaskB",
      traintrialNum: 1,
      traintrialTotal: nr_traintrial,
      feedback: 0,
      disp_el: 1,
      disp_opt: 0,
      all_corr_values: corr_values,
      trainAcc: array_tmp,
      ansOne: ansOne,
      ansTwo: ansTwo,
      corr_pos: corr_pos,
      corr_elem: corr_elem,
      all_element_values: all_element_values,
      indicReq: indicReq_tmp,
      element1Col: 1,
      element2Col: 2,
      element3Col: 3,
      study_part: 3,
    };
    // this.displayFeedback = this.displayFeedback.bind(this)
    /* prevents page from going to the right/left when arrows are pressed .*/
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
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  /////////////////////////////////////////////////////////////////////////////////
  render() {
    if (this.state.disp_el === 1) {
      return (
        <DisplayElements
          img1={this.state.element1Col}
          img2={this.state.element2Col}
          img3={this.state.element3Col}
          all_element_values={this.state.all_element_values}
          indicReq={this.state.indicReq}
          trialNum={this.state.traintrialNum}
          onElementsEnd={this.handleElementsData}
          onElementsIndic={this.handleIndicData}
        />
      );
    } else if (this.state.disp_opt === 1) {
      return (
        <DisplayTrainOptions
          ansTwo={this.state.ansTwo}
          ansOne={this.state.ansOne}
          trainIndic={this.trainIndic}
        />
      );
    } else if (this.state.feedback === 1) {
      return (
        <DisplayTrainFeedback
          corr_value={this.state.all_corr_values[this.state.traintrialNum - 1]}
          handleFeedback={this.feedbackShown}
        />
      );
    }
  }
  handleElementsData = () => {
    this.setState({
      disp_el: 0,
      disp_opt: 1,
    });
  };

  trainIndic = (pressed) => {
    var trainAcc_tmp = this.state.trainAcc;

    if (pressed === this.state.corr_pos[this.state.traintrialNum - 1]) {
      trainAcc_tmp[this.state.traintrialNum - 1] = 1;
    } else {
      trainAcc_tmp[this.state.traintrialNum - 1] = 0;
    }

    this.setState({
      trainAcc: trainAcc_tmp,
      disp_opt: 0,
      feedback: 1,
    });
  };

  feedbackShown = () => {
    if (this.state.traintrialNum === this.state.traintrialTotal) {
      this.redirectToNextStage();
    } else {
      var traintrialNum_tmp = this.state.traintrialNum + 1;
      var all_corr_values = this.state.all_corr_values;
      var corr_pos = this.state.corr_pos;
      if (corr_pos[traintrialNum_tmp - 1] === 4) {
        var ansTwo = 100 - all_corr_values[traintrialNum_tmp - 1];
        var ansOne = all_corr_values[traintrialNum_tmp - 1];
      } else {
        var ansOne = 100 - all_corr_values[traintrialNum_tmp - 1];
        var ansTwo = all_corr_values[traintrialNum_tmp - 1];
      }

      this.setState({
        traintrialNum: traintrialNum_tmp,
        disp_el: 1,
        feedback: 0,
        ansTwo: ansTwo,
        ansOne: ansOne,
      });
    }
  };

  redirectToNextStage() {
    let body = {
      sectionStartTime: this.state.sectionTime,
      startTime: this.state.startTime,
      corr_elem: this.state.corr_elem,
      trainAcc: this.state.trainAcc,
      corr_pos: this.state.corr_pos,
      all_corr_values: this.state.all_corr_values,
    };

    fetch(
      `${API_URL}/training_b/create/` +
        this.state.userID +
        `/` +
        this.state.study_part,
      {
        //eigentlich auch in den body beim ersten mal
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    ////////////////////////
    this.props.history.push({
      pathname: `/TrainingIntroC`,
      state: {
        userID: this.state.userID,
        date: this.state.date,
        startTime: this.state.startTime,
      },
    });
  }
}

export default withRouter(TrainingTaskB);
