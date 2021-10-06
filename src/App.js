import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StartPage from "./Components/StartPage";
import SliderIntro from "./Components/SliderIntro";
import SliderPractice from "./Components/sliderTraining";
import TrainingIntroA from "./Components/TrainingIntroA";
import TrainingTaskA from "./Components/TrainingTaskA";
import TrainingIntroB from "./Components/TrainingIntroB";
import TrainingTaskB from "./Components/TrainingTaskB";
import TrainingIntroC from "./Components/TrainingIntroC";
import TrainingTaskC from "./Components/TrainingTaskC";
import MainTaskIntro from "./Components/MainTaskIntro";
import MainTask from "./Components/MainTask";
import Questionnaires from "./Components/Questionnaires";
import EndPage from "./Components/EndPage";

import ElementsIndicator from"./Components/elementsIndicator";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={StartPage} exact />
        <Route path="/SliderIntro" component={SliderIntro} exact />
        <Route path="/sliderTraining" component={SliderPractice} exact />
        <Route path="/TrainingIntroA" component={TrainingIntroA} exact />
        <Route path="/TrainingIntroB" component={TrainingIntroB} exact />
        <Route path="/TrainingIntroC" component={TrainingIntroC} exact />
        <Route path="/MainTaskIntro" component={MainTaskIntro} exact />
        <Route path="/TrainingTaskA" component={TrainingTaskA} exact />
        <Route path="/TrainingTaskB" component={TrainingTaskB} exact />
        <Route path="/TrainingTaskC" component={TrainingTaskC} exact />
        <Route path="/MainTask" component={MainTask} exact />
        <Route path="/ElementsIndicator" component={ElementsIndicator} exact />
        <Route path="/Questionnaires" component={Questionnaires} exact />
        <Route path="/EndPage" component={EndPage} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
