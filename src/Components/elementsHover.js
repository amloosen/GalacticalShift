import React from 'react';
import { render } from "react-dom";
import styles from "./style/taskStyle.module.css";

import BarTraining from './barTraining';

import Cover from "./img/cover.jpg";
import Blue from "./img/stimuli3_blue.jpg";
import Red from "./img/stimuli3_red.jpg";
import Green from "./img/stimuli3_green.jpg";
import Yellow from "./img/stimuli3_yellow.jpg";
import Hello from "./Hello";


class ElementsTraining extends React.Component{

    state = {
      img: Cover
    };

    // showElement1() {
    //     img: Red;
    //   }

    render() {
      return (
        <div className={styles.itemcenter}>
        <div>
        <img className={styles.elementsize}
              src={this.state.img}
              onMouseEnter={() => {
                this.setState({
                  img:
                    Blue
                });
              }}
              onMouseOut={() => {
                this.setState({
                  img: Cover
                });
              }}
            />
        </div>
        <div>
        <img className={styles.elementsize}
              src={this.state.img}
              onMouseEnter={() => {
                this.setState({
                  img:
                    Blue
                });
              }}

              onMouseOut={() => {
                this.setState({
                  img: Cover
                });
              }}
            />
        </div>
        <div>
        <img className={styles.elementsize}
              src={this.state.img}
              onMouseEnter={() => {
                this.setState({
                  img3:
                    Yellow
                });
              }}

              onMouseOut={() => {
                this.setState({
                  img3: Cover
                });
              }}
            />
         </div>
        </div>

      );
    }
  }

render(<ElementsTraining />, document.getElementById("root"));

export default ElementsTraining;
