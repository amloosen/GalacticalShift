import React from 'react';
import { render } from "react-dom";
import styles from "./style/taskStyle.module.css";
import {Image} from "react-native";
import BarTraining from './barTraining';

import Cover from "./img/cover.jpg";
import Blue from "./img/stimuli3_blue.jpg";
import Red from "./img/stimuli3_red.jpg";
import Green from "./img/stimuli3_green.jpg";
import Yellow from "./img/stimuli3_yellow.jpg";
import Hello from "./Hello";


class ElementsTraining extends React.Component{

    state = {
      img1: Cover,
      img2: Cover,
      img3: Cover
    };
    render() {
      return (<div className={styles.cockpit}>
        <div className={styles.main}>
        <span className={styles.centerTwo}>
          <img className={styles.elementsize }
              src={this.state.img1}
              onMouseEnter={() => {
                this.setState({
                  img1: Blue
                });
              }}
              onMouseOut={() => {
                this.setState({
                  img1: Cover
                });
              }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <img className={styles.elementsize }
                src={this.state.img2}
                onMouseEnter={() => {
                  this.setState({
                    img2: Red
                  });
                }}
                onMouseOut={() => {
                  this.setState({
                    img2: Cover
                            });
                          }}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img className={styles.elementsize }
                                      src={this.state.img3}
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
                                    </span>
                                  </div>
     </div>

      );
    }
  }

render(<ElementsTraining />, document.getElementById("root"));

export default ElementsTraining;
