import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import StartPage from "./Components/StartPage";
import SliderIntro from "./Components/SliderIntro";
import SliderPractice from "./Components/sliderTraining";
import TrainingIntro from "./Components/TrainingIntro";
import TrainingTask from "./Components/TrainingTask";
import TutorTask from "./Components/TutorTask";
import ExptTask from "./Components/ExptTask";
import Questionnaires from "./Components/Questionnaires";
import EndPage from "./Components/EndPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={StartPage} exact />
        <Route path="/SliderIntro" component={SliderIntro} exact />
        <Route path="/sliderTraining" component={SliderPractice} exact />
        <Route path="/TrainingIntro" component={TrainingIntro} exact />
        <Route path="/TrainingTask" component={TrainingTask} exact />
        <Route path="/TutorTask" component={TutorTask} exact />
        <Route path="/ExptTask" component={ExptTask} exact />
        <Route path="/Questionnaires" component={Questionnaires} exact />
        <Route path="/EndPage" component={EndPage} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
