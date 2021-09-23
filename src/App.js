import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import StartPage from "./Components/StartPage";
import TrainingIntro from "./Components/TrainingIntro";
import TrainingTask from "./Components/TrainingTask";
import OutcomeSlider from "./Components/sliderOutcome";
// import ElementsFullDisplay  from "./Components/elementsFulldisplay ";
// import ElementBar from "./Components/elementBar";
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
        <Route path="/TrainingIntro" component={TrainingIntro} exact />
        <Route path="/TrainingTask" component={TrainingTask} exact />
        <Route path="/sliderOutcome" component={OutcomeSlider} exact />
        <Route path="/TutorTask" component={TutorTask} exact />
        <Route path="/ExptTask" component={ExptTask} exact />
        <Route path="/Questionnaires" component={Questionnaires} exact />
        <Route path="/EndPage" component={EndPage} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
