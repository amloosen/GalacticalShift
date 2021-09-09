import React from 'react';
import { render } from "react-dom";
import BarTraining from './barTraining';

import Cover from "./img/cover.jpg";
import Blue from "./img/stimuli3_blue.jpg";
import Red from "./img/stimuli3_red.jpg";
import Green from "./img/stimuli3_green.jpg";
import Yellow from "./img/stimuli3_yellow.jpg";
import Hello from "./Hello";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
///
class ElementsTraining extends React.Component{

    state = {
      img: Cover
    };

    render() {
      return (
          <img
            src={this.state.img}
            onMouseEnter={() => {
              this.setState({
                img:
                  Red
              });
            }}
            onMouseOut={() => {
              this.setState({
                img: Cover
              });
            }}
          />
        
      );
    }
  }

  render(<ElementsTraining />, document.getElementById("root"));

//
//
//     mouseOver() {
//       // e.target.style.background = 'red';
//         this.handle = setTimeout(() => {
//             console.log('2 seconds have elapsed');
//         }, 1000);
//     }
//
//     mouseLeave() {
//         if (this.handle) {
//           // e.target.style.background = 'red';
//             clearTimeout(this.handle);
//             this.handle = undefined;
//         }
//     }
//
//     render() {
//         return (
//             <div onMouseOver={this.mouseOver} onMouseLeave={this.mouseLeave}>
//
//             </div>
//         );
//     }
// }

export default ElementsTraining;


//
// class ElementsTraining extends React.Component{
//
//   render(){
//     return (
//
//       <div className="elements">
//
//       <BarTraining value={this.props.value} col={this.props.col} training_elements_col={this.props.training_elements_col}/>
//
//       </div>
//     );
//   }
// };
//
// export default ElementsTraining;
