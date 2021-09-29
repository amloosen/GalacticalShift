import React from "react";
import { withRouter } from "react-router-dom";
// import { DATABASE_URL } from "./config";
import styles from "./style/taskStyle.module.css";
import { range } from "lodash";
import ElementsFullDisplay from "./elementsFulldisplay";
////////////////////////////////////////////////////////////////////////////////
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
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
    // var rand = Math.floor(Math.random() * 10);
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

    var nr_train_a_trial = 12;
    var val_options = range(0, 110, 10);
    val_options.splice(val_options.indexOf(50), 1); //remove the 50 to make it clearer which element is correct
    var random_val = [];
    for (var i = 0; i <= nr_train_a_trial - 1; i++) {
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
    let array_tmp = Array(nr_train_a_trial).fill(0);

    // var rightCodeAns = [4, 4, 4, 4, 4, 5, 5, 5, 5];
    var corr_pos = [4, 4, 4, 4, 4, 5, 5, 5, 5]; //1 is left and 2 is right; determine where the correct value is displayed
    shuffle(corr_pos);
    // initialize options for the first trial
    if (corr_pos[0] === 4) {
      var ansTwo = 100 - corr_values[0];
      var ansOne = corr_values[0];
    } else {
      var ansOne = 100 - corr_values[0];
      var ansTwo = corr_values[0];
    }

    var corr_elem_tmp = [1, 2, 3]; //1 is left and 2 is right; determine where the correct value is displayed
    shuffle(corr_elem_tmp);
    var corr_elem = Array(nr_train_a_trial).fill(0);

    for (var i = 0; i <= nr_train_a_trial - 1; i++) {
      if (i < nr_train_a_trial / 3) {
        corr_elem[i] = corr_elem_tmp[0];
      } else if (i >= nr_train_a_trial / 3 && i < (nr_train_a_trial / 3) * 2) {
        corr_elem[i] = corr_elem_tmp[1];
      } else {
        corr_elem[i] = corr_elem_tmp[2];
      }
    }
//pregenerate the values for all elements
var check_al2 = [];
var check_al1 = [];

for (var i = 0; i <= nr_train_a_trial - 1; i++) {
  var restricted = [corr_values[i],100-corr_values[i]];
  if (i < nr_train_a_trial / 2) {
    check_al1[i] = getRand(restricted);
    check_al2[i] = 100-corr_values[i];
  } else {
    check_al1[i] = 100-corr_values[i];
    check_al2[i] = getRand(restricted);
  }
}


//pregenerate the position of the correct value
    // if (corr_elem[0] === 1) {
    //   var valElem1 = corr_values[0];
    //   var valElem2 = 100-corr_values[0];
    //   if (valElem1>=10){
    //     var valElem3 = corr_values[0]-10;
    //   }else{var valElem3 = corr_values[0]+10;}
    //
    // } else if {(corr_elem[0] === 1)

      //
      // var ansOne = 100 - corr_values[0];
      // var ansTwo = corr_values[0];
    // }

    // initialize options for the first trial
    // if (corr_pos[0] === 4) {
    //   var ansTwo = 100 - corr_values[0];
    //   var ansOne = corr_values[0];
    // } else {
    //   var ansOne = 100 - corr_values[0];
    //   var ansTwo = corr_values[0];
    // }

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
      all_corr_values: corr_values,
      valTrainElem: corr_values[0],
      corr_value: corr_values[0],
      trainAcc: array_tmp,
      ansOne: ansOne,
      ansTwo: ansTwo,
      corr_pos: corr_pos,
      // corr_elem:,
      valElem1: null,
      valElem2: null,
      valElem3: null,
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
  // componentDidMount() {
  //     setTimeout(
  //       function() {
  //         this.setState({
  //           mounted: 1,
  //         });
  //       }
  //       .bind(this),
  //       5000
  //     );
  //   }
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

  /////////////////////////////////////////////////////////////////////////////////
  render() {
    setTimeout(() => {
      this.setState({ timePassed: true });
    }, 10000); //show elements
    if (!this.state.timePassed) {
      return (
        <ElementsFullDisplay
          value1={30}
          value2={40}
          value3={80}
          trialTotal={this.state.trialTotal}
          trialNum={this.state.trialNum}
        />
      );
    } else {
      // if (this.state.timePassed===true && this.state.feedback===false){
      let choiceTime0 = Math.round(performance.now());

      let text = (
        <div className={styles.questions}>
          How large is the alien population?
          <br />
          <br />
          <br />
        </div>
      );

      let text2 = (
        <div className={styles.questions}>
          The true population on the planet was {50} mio.
          <br />
          <br />
          <br />
        </div>
      );

      // return (
      // <div>
      //   {" "}
      //   {this.state.feedback ? (
      // <div className={styles.cockpit}>
      //   <div>{text2}</div>
      //   <div className={styles.overlaybar}>
      //     <OutcomeSliderBar
      //       mu={this.state.trialSgmMu[this.state.trialNum - 1][2]}
      //       sgm={this.state.trialSgmMu[this.state.trialNum - 1][1]}
      //       value={this.state.trueValue}
      //     />
      //   </div>
      //   <div className={styles.overlaybar}>
      //     <OutcomeSlider
      //       mu={this.state.trialSgmMu[this.state.trialNum - 1][2]}
      //       sgm={this.state.trialSgmMu[this.state.trialNum - 1][1]}
      //     />
      //   </div>
      // </div>
      // ) : (
      //   <div className={styles.cockpit}>
      //     // <div>{text}</div>
      //     // <Slider
      //     //   onSpacebarHit={(result) => {
      //     //     this.saveSgmMu(result, choiceTime0);
      //     //   }}
      //     // />
      //   </div>
      // )}
      // </div>
      // );
    }
  }
  /////////////////////////////////////////////////////////////////////////////////

  saveSgmMu(result, time) {
    let trialSgmMu = this.state.trialSgmMu;
    let trialRT = this.state.trialRT;
    let trialNum = this.state.trialNum;
    trialSgmMu[trialNum - 1][1] = result.sgm;
    trialSgmMu[trialNum - 1][2] = result.mu;
    trialRT[trialNum - 1][0] = trialNum;
    trialRT[trialNum - 1][1] = time;
    trialRT[trialNum - 1][2] = Math.round(performance.now());
    trialRT[trialNum - 1][3] = trialRT[trialNum - 1][2] - time;
    this.setState({
      trialSgmMu: trialSgmMu,
      trialRT: trialRT,
      feedback: true,
      // trialNum : trialNum+1,
      // outcome: show
    });
  }
}

export default withRouter(TrainingTaskB);
