import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StartPage from "./Components/StartPage";
// import SliderIntro from "./Components/SliderIntro";
// import SliderTraining from "./Components/SliderTraining";
// import TrainingIntroA from "./Components/TrainingIntroA";
// import TrainingTaskA from "./Components/TrainingTaskA";
// import TrainingIntroB from "./Components/TrainingIntroB";
// import TrainingTaskB from "./Components/TrainingTaskB";
// import TrainingIntroC from "./Components/TrainingIntroC";
// import TrainingTaskC from "./Components/TrainingTaskC";
// import DisplayQuiz from "./Components/DisplayQuiz";
// import MainTaskIntro from "./Components/MainTaskIntro";
// import MainTask from "./Components/MainTask";
// import EndPage from "./Components/EndPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={StartPage} exact />
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
