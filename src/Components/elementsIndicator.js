import React from "react";
import styles from "./style/taskStyle.module.css";
import { View } from "react-native";
import ElementBar from "./elementBar";
import Cover from "./img/cover.jpg";
import Blue from "./img/stimuli3_blue.jpg";
import Red from "./img/stimuli3_red.jpg";
// import Green from "./img/stimuli3_green.jpg";
import Yellow from "./img/stimuli3_yellow.jpg";
//

class ElementsIndicator extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.element_col[0] === 1) {
      var img_1 = Blue;
      if (this.props.element_col[1] === 2) {
        var img_2 = Red;
        var img_3 = Yellow;
      } else if (this.props.element_col[1] === 3) {
        var img_2 = Yellow;
        var img_3 = Red;
      }
    } else if (this.props.element_col[0] === 2) {
      var img_1 = Red;
      if (this.props.element_col[1] === 3) {
        var img_2 = Yellow;
        var img_3 = Blue;
      } else if (this.props.element_col[1] === 1) {
        var img_2 = Blue;
        var img_3 = Yellow;
      }
    } else if (this.props.element_col[0] === 3) {
      var img_1 = Yellow;
      if (this.props.element_col[1] === 1) {
        var img_2 = Blue;
        var img_3 = Red;
      } else if (this.props.element_col[1] === 2) {
        var img_2 = Red;
        var img_3 = Blue;
      }
    }

    this.state = {
      img1: img_1,
      img2: img_2,
      img3: img_3,
    };

    this.trialSave = this.trialSave.bind(this);

    /* prevents page from going down when space bar is hit .*/
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
      }
    });
  }

  _handleTestKey = (event) => {
    var pressed;
    var time_pressed;
    switch (event.keyCode) {
      case 49:
        pressed = 1;
        time_pressed = Math.round(performance.now());
        this.trialSave(pressed, time_pressed);
        break;
      case 50:
        pressed = 2;
        time_pressed = Math.round(performance.now());
        this.trialSave(pressed, time_pressed);
        break;
      case 51:
        pressed = 3;
        time_pressed = Math.round(performance.now());
        this.trialSave(pressed, time_pressed);
        break;
      default:
    }
  };

  trialSave(pressed, time_pressed) {
    document.removeEventListener("keyup", this._handleTestKey);
    if (pressed === this.props.corAns) {
      var indicCor = 1;
    } else {
      var indicCor = 0;
    }

    let saveString = {
      userID: this.props.userID,
      indicTime: time_pressed,
      trialNum: this.props.trialNum,
      blockNum: this.props.blockNum,
      trialKeypress: pressed,
      indicCor: indicCor,
    };

    // try {
    //   fetch(`${DATABASE_URL}/outcome_test/` + userID, {
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
  }

  render() {
    document.addEventListener("keyup", this._handleTestKey);
    return (
      <div className={styles.cockpit}>
        <div className={styles.main}>
          <span className={styles.centerThree}>
            <View style={styles.container}>
              <img className={styles.elementsize} src={this.state.img1} />
              <div className={styles.indicatortext}>{1}</div>
            </View>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <View style={styles.container}>
              <img className={styles.elementsize} src={this.state.img2} />
              <div className={styles.indicatortext}>{2}</div>
            </View>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <View style={styles.container}>
              <img className={styles.elementsize} src={this.state.img3} />
              <div className={styles.indicatortext}>{3}</div>
            </View>
          </span>
        </div>
      </div>
    );
  }
}

export default ElementsIndicator;
