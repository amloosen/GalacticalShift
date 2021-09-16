import React from 'react';
import styles from "./style/taskStyle.module.css";
import Slider from "./slider";
import Cockpit from "./img/CockpitBlank.jpg";


class SliderTraining extends React.Component{

  var trialTime0 = Math.round(performance.now());
  var trialSgmMu = this.state.trialSgmMu;
  var trialRT = this.state.trialRT;
render(){
  let text = (
    <div className={styles.questions}>
    How large is the alien population?
    <br />
    <br />
    <br />
    </div>);

  return (
      <div className={styles.cockpit}>
      <div>{text}</div>
      <Slider onSpacebarHit={(result) => this.saveSgmMu(result)} />
      </div>
    );

 }
}
export default AppleTraining;
