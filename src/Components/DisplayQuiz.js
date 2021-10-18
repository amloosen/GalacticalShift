import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./style/taskStyle.module.css";
import Quiz from "./Quiz";

class DisplayQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuiz: 1,
      nextRound: 0,
      allCorrect: 0
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    clearTimeout()
  }

componentDidUpdate(){
  if (this.state.nextRound==1) {
  setTimeout(() => {
    this.nextRound();
  },3000);
}
if (this.state.allCorrect===1) {
setTimeout(() => {
  this.redirectToNextStage();
},3000);
}

}

  nextRound = () => {
      this.setState({
        showQuiz: 1,
        nextRound: 0,
      });
  };

  quizCompleted = (score) => {
    if (score === 5) {
      this.setState({
        showQuiz: 0,
        nextRound: 0,
        allCorrect:1
      });
      // this.redirectToNextStage();
    } else if (score<5){
      this.setState({
        showQuiz: 0,
        nextRound: 1,
      });
    }
  };

  render() {
    let text;

    if (this.state.showQuiz) {
      return (
        <div className={styles.cockpit}>
          <Quiz onQuizEnd={this.quizCompleted} />
        </div>
      );
    } else if (this.state.nextRound===1) {
      let text = (
        <div className={styles.quizend}>
          <p>
            <br />
            You unfortunately, made some mistakes.
            <br />
            <br />
            Try again!
            <br />
          </p>
        </div>
      );
      return (
        <div className={styles.cockpit}>
          <div className={styles.textblock}>{text}</div>
        </div>
      );
    } else if (this.state.allCorrect===1) {
      let text = (
        <div className={styles.quizend}>
          <p>
            <br />
            Congratulations, you succesfully passed the quiz and will now
            <br /><br />
            start the main game.
            <br /><br />
            Good luck!
            <br />
          </p>
        </div>
      );
      return (
        <div className={styles.cockpit}>
          <div className={styles.textblock}>{text}</div>
        </div>
      );
}
  }

  redirectToNextStage(h) {
    this.props.history.push({
      pathname: `/MainTask`,
      state: {
        userID: this.state.userID,
        date: this.state.date,
        startTime: this.state.startTime,
      },
    });
  }
}
export default withRouter(DisplayQuiz);
