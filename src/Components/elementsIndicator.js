import React from "react";
import styles from "./style/taskStyle.module.css";
import {View} from "react-native";
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

    this.state = {
      img1: Cover,
      img2: Cover,
      img3: Cover,
      show1: null,
      show2: null,
      show3: null,

    };

    /* prevents page from going down when space bar is hit .*/
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
      }
    });
  }
  // 
  // mouseOver(elNr) {
  //   if (elNr === 1) {
  //     this.state.times_element1.push([Math.round(performance.now()), 0, 0]);
  //     this.setState({
  //       img1: Blue,
  //       show1: 1,
  //     });
  //   } else if (elNr === 2) {
  //     this.state.times_element2.push([Math.round(performance.now()), 0, 0]);
  //     this.setState({
  //       img2: Red,
  //       show2: 1,
  //     });
  //   } else if (elNr === 3) {
  //     this.state.times_element3.push([Math.round(performance.now()), 0, 0]);
  //     this.setState({
  //       img3: Yellow,
  //       show3: 1,
  //     });
  //   }
  }
//
//   mouseOut(elNr) {
//     if (elNr === 1) {
//       debugger;
//       var times1_tmp = this.state.times_element1;
//           times1_tmp[times1_tmp.length - 1][1] = Math.round(performance.now());
//           times1_tmp[times1_tmp.length - 1][2] = times1_tmp[times1_tmp.length - 1][1] -times1_tmp[times1_tmp.length - 1][0];
//
//       this.setState({
//         times_element1: times1_tmp,
//         img1: Cover,
//         show1: null,
//       });
//     } else if (elNr === 2) {
// var times2_tmp = this.state.times_element2;
//       times2_tmp[times2_tmp.length - 1][1] = Math.round(performance.now());
//       times2_tmp[times2_tmp.length - 1][2] = times2_tmp[times2_tmp.length - 1][1] -  times2_tmp[times2_tmp.length - 1][0];
//
//       this.setState({
//         times_element2: times2_tmp,
//         img2: Cover,
//         show2: null,
//       });
//     } else if (elNr === 3) {
//       var times3_tmp = this.state.times_element3;
//       times3_tmp[times3_tmp.length - 1][1] = Math.round(performance.now());
//       times3_tmp[times3_tmp.length - 1][2] = times3_tmp[times3_tmp.length - 1][1] - times3_tmp[times3_tmp.length - 1][0];
//
//       this.setState({
//         img3: Cover,
//         show3: null,
//       });
//     }
//   }

  render() {
    return (
      <div className={styles.cockpit}>
        <div className={styles.main}>
          <span className={styles.centerThree}>
            <View style={styles.container}>
              <img
                className={styles.elementsize}
                src={this.state.img1}
              />
              // {this.state.show1 ? (
              //   <div className={styles.overlay}>
              //     <ElementBar progress={this.props.value1} />
              //   </div>
              // ) : null}
              // {this.state.show1 ? (
              //   <div className={styles.overlaytext}>{this.props.value1}%</div>
              // ) : null}
            </View>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <View style={styles.container}>
              <img
                className={styles.elementsize}
                src={this.state.img2}
              />
            </View>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <View style={styles.container}>
              <img
                className={styles.elementsize}
                src={this.state.img3}
              />
            </View>
          </span>
        </div>
      </div>
    );
  }
}

export default ElementsIndicator;
