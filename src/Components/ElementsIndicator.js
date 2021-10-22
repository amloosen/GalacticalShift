import React from "react";
import styles from "./style/taskStyle.module.css";
import { View } from "react-native-web";
import Blue from "./img/stimuli3_blue.jpg";
import Red from "./img/stimuli3_red.jpg";
// import Green from "./img/stimuli3_green.jpg";
import Yellow from "./img/stimuli3_yellow.jpg";


class ElementsIndicator extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      img1: this.props.img1,
      img2: this.props.img2,
      img3: this.props.img3,
    };

    /* prevents page from going down when space bar is hit .*/
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
      }
    });
  }

  render() {
    let text = (
      <div className={styles.main}>
        <p>
          <br /> <br />
          <br /> <br />
          Please indicate which instrument you think is currently determining
          the population size.
          <br /> <br />
          Do so by pressing the corresponding number key.
        </p>
      </div>
    );


    return (
      <div className={styles.cockpit}>
        <div>{text}</div>
        <span className={styles.centerThreeIndic}>
          <View style={styles.container}>
            <img
              className={styles.elementsize}
              src={this.state.img1}
              alt="indic1"
            />
            <div className={styles.indicatortext}>{1}</div>
          </View>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <View style={styles.container}>
            <img
              className={styles.elementsize}
              src={this.state.img2}
              alt="indic2"
            />
            <div className={styles.indicatortext}>{2}</div>
          </View>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <View style={styles.container}>
            <img
              className={styles.elementsize}
              src={this.state.img3}
              alt="indic3"
            />
            <div className={styles.indicatortext}>{3}</div>
          </View>
        </span>
      </div>
    );
  }
}

export default ElementsIndicator;
