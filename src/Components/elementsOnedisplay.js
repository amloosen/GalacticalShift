import React from "react";
import { render } from "react-dom";
import styles from "./style/taskStyle.module.css";
import { ImageBackground, View, Image, StyleSheet,Text } from "react-native";
import ElementBar from "./elementBar";

import Cover from "./img/cover.jpg";
import Blue from "./img/stimuli3_blue.jpg";
import "./style/barstyles.css";

class ElementsOneDisplay extends React.Component {
  constructor(props) {
    super(props);
    var trial_per_block = 100; //to be changed

    /* data to be saved .*/
    var times_element = Array(1)
      .fill()
      .map(() => Array(3).fill(0));

    this.state = {
      img: Cover,
      value: props.value,
      show: null,
      times_element: times_element,
    };

    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);

    /* prevents page from going down when space bar is hit .*/
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
      }
    });
  }

  mouseOver(elNr) {
    this.state.times_element.push([Math.round(performance.now()), 0, 0]);
    this.setState({
      img: Blue,
      show: 1,
    });
  }

  mouseOut(elNr) {
    this.state.times_element[
      this.state.times_element.length - 1
    ][1] = Math.round(performance.now());
    this.state.times_element[this.state.times_element.length - 1][2] =
      this.state.times_element[this.state.times_element.length - 1][1] -
      this.state.times_element[this.state.times_element.length - 1][0];
    this.setState({
      img: Cover,
      show: null,
    });
  }

  render() {
    return (
      <div className={styles.cockpit}>
        <div className={styles.main}>
          <span className={styles.centerTwo}>
            <View style={styles.container}>
              <img
                className={styles.elementsize}
                src={this.state.img}
                onMouseOver={(elNr) => this.mouseOver(1)}
                onMouseOut={(elNr) => this.mouseOut(1)}
              />
              {this.state.show ? (
                <div className={styles.overlay}>
                  <ElementBar progress={this.props.value} />
                </div>
              ) : null}
              {this.state.show ? (
                <div className={styles.overlaytext}>{this.props.value}%</div>
              ) : null}
            </View>
          </span>
        </div>
      </div>
    );
  }
}

export default ElementsOneDisplay;
