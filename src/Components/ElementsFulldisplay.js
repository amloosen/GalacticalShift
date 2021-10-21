import React from "react";
import styles from "./style/taskStyle.module.css";
// import { View } from "react-native";
import ElementBar from "./ElementBar";
import Cover from "./img/cover.jpg";
import Blue from "./img/stimuli3_blue.jpg";
import Red from "./img/stimuli3_red.jpg";
// import Green from "./img/stimuli3_green.jpg";
import Yellow from "./img/stimuli3_yellow.jpg";
import "./style/barstyles.css";
//

class ElementsFullDisplay extends React.Component {
  constructor(props) {
    super(props);
    /* data to be saved .*/
    var times_element1 = Array(1) //trialNum, starttimeview, endtimeview, totalviewtime
      .fill()
      .map(() => Array(4).fill(0));
    var times_element2 = Array(1)
      .fill()
      .map(() => Array(4).fill(0));
    var times_element3 = Array(1)
      .fill()
      .map(() => Array(4).fill(0));

    if (this.props.img1 === 1) {
      var img1 = Blue;
      if (this.props.img2 === 2) {
        var img2 = Red;
        var img3 = Yellow;
      } else if (this.props.img2 === 3) {
        var img2 = Yellow;
        var img3 = Red;
      }
    } else if (this.props.img1 === 2) {
      var img1 = Red;

      if (this.props.img2 === 3) {
        var img2 = Yellow;
        var img3 = Blue;
      } else if (this.props.img2 === 1) {
        var img2 = Blue;
        var img3 = Yellow;
      }
    } else if (this.props.img1 === 3) {
      var img1 = Yellow;

      if (this.props.img2 === 1) {
        var img2 = Blue;
        var img3 = Red;
      } else if (this.props.img2 === 2) {
        var img2 = Red;
        var img3 = Blue;
      }
    }

    this.state = {
      img1: Cover,
      img2: Cover,
      img3: Cover,
      show1: null,
      show2: null,
      show3: null,
      shownImg1: img1,
      shownImg3: img2,
      shownImg2: img3,
      times_element1: times_element1,
      times_element2: times_element2,
      times_element3: times_element3,
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

  componentDidMount() {
    setTimeout(() => {
      this.props.onViewEnd(
        this.state.times_element1,
        this.state.times_element2,
        this.state.times_element3
      );
    }, 4000);
  }

  componentWillUnmount() {
    clearTimeout();
  }

  mouseOver(elNr) {
    if (elNr === 1) {
      this.state.times_element1.push([Math.round(performance.now()), 0, 0]);
      this.setState({
        img1: this.state.shownImg1,
        show1: 1,
      });
    } else if (elNr === 2) {
      this.state.times_element2.push([Math.round(performance.now()), 0, 0]);
      this.setState({
        img2: this.state.shownImg2,
        show2: 1,
      });
    } else if (elNr === 3) {
      this.state.times_element3.push([Math.round(performance.now()), 0, 0]);
      this.setState({
        img3: this.state.shownImg3,
        show3: 1,
      });
    }
  }

  mouseOut(elNr) {
    if (elNr === 1) {
      var times_element1 = this.state.times_element1;
      times_element1[times_element1.length - 1][0] = this.props.trialNum;
      times_element1[times_element1.length - 1][2] = Math.round(
        performance.now()
      );
      times_element1[times_element1.length - 1][3] =
        times_element1[times_element1.length - 1][2] -
        times_element1[times_element1.length - 1][1];
      this.setState({
        img1: Cover,
        show1: null,
        style1: styles.elementsize,
        times_element1: times_element1,
      });
    } else if (elNr === 2) {
      var times_element2 = this.state.times_element2;
      times_element2[times_element2.length - 1][0] = this.props.trialNum;
      times_element2[times_element2.length - 1][2] = Math.round(
        performance.now()
      );
      times_element2[times_element2.length - 1][3] =
        times_element2[times_element2.length - 1][2] -
        times_element2[times_element2.length - 1][1];
      this.setState({
        img2: Cover,
        show2: null,
        style2: styles.elementsize,
        times_element2: times_element2,
      });
    } else if (elNr === 3) {
      var times_element3 = this.state.times_element3;
      times_element3[times_element3.length - 1][0] = this.props.trialNum;
      times_element3[times_element3.length - 1][2] = Math.round(
        performance.now()
      );
      times_element3[times_element3.length - 1][3] =
        times_element3[times_element3.length - 1][2] -
        times_element3[times_element3.length - 1][1];
      this.setState({
        img3: Cover,
        show3: null,
        style3: styles.elementsize,
        times_element3: times_element3,
      });
    }
  }
  // 
  // <div className={styles.cockpit}>
  //   <div className={styles.main}>
  //       <View style={styles.container}>
  //         <img
  //           className={styles.elementsize}
  //           src={this.state.img1}
  //           alt="element1"
  //           onMouseOver={(elNr) => this.mouseOver(1)}
  //           onMouseOut={(elNr) => this.mouseOut(1)}
  //         />
  //         {this.state.show1 ? (
  //           <div className={styles.overlay}>
  //             <ElementBar progress={this.props.value1} />
  //           </div>
  //         ) : null}
  //         {this.state.show1 ? (
  //           <div className={styles.overlaytext}>{this.props.value1}%</div>
  //         ) : null}
  //       </View>
  //       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  //       <View style={styles.container}>
  //         <img
  //           className={styles.elementsize}
  //           src={this.state.img2}
  //           alt="element2"
  //           onMouseOver={(elNr) => this.mouseOver(2)}
  //           onMouseOut={(elNr) => this.mouseOut(2)}
  //         />
  //         {this.state.show2 ? (
  //           <div className={styles.overlay}>
  //             <ElementBar progress={this.props.value2} />
  //           </div>
  //         ) : null}
  //         {this.state.show2 ? (
  //           <div className={styles.overlaytext}>{this.props.value2}%</div>
  //         ) : null}
  //       </View>
  //       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  //       <View style={styles.container}>
  //         <img
  //           className={styles.elementsize}
  //           src={this.state.img3}
  //           alt="element3"
  //           onMouseOver={(elNr) => this.mouseOver(3)}
  //           onMouseOut={(elNr) => this.mouseOut(3)}
  //         />
  //         {this.state.show3 ? (
  //           <div className={styles.overlay}>
  //             <ElementBar progress={this.props.value3} />
  //           </div>
  //         ) : null}
  //         {this.state.show3 ? (
  //           <div className={styles.overlaytext}>{this.props.value3}%</div>
  //         ) : null}
  //       </View>
  //   </div>
  // </div>

  render() {
    return (
      <div className={styles.cockpit}>
        <div className={styles.main}>
              <img
                className={styles.elementsize}
                src={this.state.img1}
                alt="element1"
                onMouseOver={(elNr) => this.mouseOver(1)}
                onMouseOut={(elNr) => this.mouseOut(1)}
              />
              {this.state.show1 ? (
                <div className={styles.overlay}>
                  <ElementBar progress={this.props.value1} />
                </div>
              ) : null}
              {this.state.show1 ? (
                <div className={styles.overlaytext}>{this.props.value1}%</div>
              ) : null}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img
                className={styles.elementsize}
                src={this.state.img2}
                alt="element2"
                onMouseOver={(elNr) => this.mouseOver(2)}
                onMouseOut={(elNr) => this.mouseOut(2)}
              />
              {this.state.show2 ? (
                <div className={styles.overlay}>
                  <ElementBar progress={this.props.value2} />
                </div>
              ) : null}
              {this.state.show2 ? (
                <div className={styles.overlaytext}>{this.props.value2}%</div>
              ) : null}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img
                className={styles.elementsize}
                src={this.state.img3}
                alt="element3"
                onMouseOver={(elNr) => this.mouseOver(3)}
                onMouseOut={(elNr) => this.mouseOut(3)}
              />
              {this.state.show3 ? (
                <div className={styles.overlay}>
                  <ElementBar progress={this.props.value3} />
                </div>
              ) : null}
              {this.state.show3 ? (
                <div className={styles.overlaytext}>{this.props.value3}%</div>
              ) : null}
        </div>
      </div>
    );
  }
}

export default ElementsFullDisplay;
