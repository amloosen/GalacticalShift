import React from 'react';
import { render } from "react-dom";
import styles from "./style/taskStyle.module.css";
import { ImageBackground, View, Image, StyleSheet,Text } from "react-native";
import ElementBar from './elementBar';

import Cover from "./img/cover.jpg";
import Blue from "./img/stimuli3_blue.jpg";
import Red from "./img/stimuli3_red.jpg";
import Green from "./img/stimuli3_green.jpg";
import Yellow from "./img/stimuli3_yellow.jpg";
import Hello from "./Hello";

import "./style/barstyles.css";
//
//
class ElementsTraining extends React.Component{

  state = {
    img1: Cover,
    img2: Cover,
    img3: Cover,
    progress1: 70,
    progress2: 40,
    progress3: 50,
    show1: null,
    show2: null,
    show3: null
  };

  // componentDidMount() {
  //     setInterval(() => {
  //       this.setState(prevState => ({
  //         progress:
  //           (prevState.progress + Math.floor(Math.random() * 20) + 1) % 100
  //       }));
  //     }, 1000);
  //   }

  render() {
    return (<div className={styles.cockpit}>
      <div className={styles.main}>
      <span className={styles.centerTwo}>
      <View style={styles.container}>
      <img className={styles.elementsize }
      src={this.state.img1}
      onMouseOver={() => {this.setState({
        img1: Blue,
        show1: 1
      });
      }}
      onMouseOut={() => {
        this.setState({
          img1: Cover,
          show1: null
        });
      }}/>
      {this.state.show1? <div className={styles.overlay}>
      <ElementBar progress={this.state.progress1} />
      </div>: null}
      {this.state.show1? <div className={styles.overlaytext}>{this.state.progress1}%
      </div>: null}
      </View>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <View style={styles.container}>
      <img className={styles.elementsize }
      src={this.state.img2}
      onMouseOver={() => {
        this.setState({
          img2: Red,
          show2: 1
        });
      }}
      onMouseOut={() => {
        this.setState({
          img2: Cover,
          show2: null
        });
      }}
      />
      {this.state.show2? <div className={styles.overlay}>
      <ElementBar progress={this.state.progress2} />
      </div>: null}
      {this.state.show2? <div className={styles.overlaytext}>{this.state.progress2}%
      </div>: null}
      </View>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <View style={styles.container}>
      <img className={styles.elementsize }
      src={this.state.img3}
      onMouseOver={() => {
        this.setState({
          img3: Yellow,
          show3: 1
        });
      }}
      onMouseOut={() => {
        this.setState({
          img3: Cover,
          show3: null
        });
      }}
      />
      {this.state.show3? <div className={styles.overlay}>
      <ElementBar progress={this.state.progress3}/>
      </div>: null}
      {this.state.show3? <div className={styles.overlaytext}>{this.state.progress3}%
      </div>: null}
      </View>
      </span>
      </div>
      </div>

    );
  }
}
//


render(<ElementsTraining />, document.getElementById("root"));

const rootElement = document.getElementById("root");

export default ElementsTraining;
