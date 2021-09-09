import React from 'react';
import Image from 'react-image-resizer';
import BarTraining from './barTraining';


import Blue from "./img/stimuli3_blue.jpg";
import Red from "./img/stimuli3_red.jpg";
import Green from "./img/stimuli3_green.jpg";
import Yellow from "./img/stimuli3_yellow.jpg";

class ElementsTraining extends React.Component{

  render(){
    return (

      <div className="elements">

      <BarTraining value={this.props.value} col={this.props.col} training_elements_col={this.props.training_elements_col}/>

      </div>
    );
  }
};

export default ElementsTraining;
