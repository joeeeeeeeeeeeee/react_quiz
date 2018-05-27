import React, { component } from 'react';
import { QUESTIONS } from './QuestionData';
import './App.css';
const initialState = {
  questionNo: 1,
  questionAnswered: false,
  correct: false,
  selctedAnswer: "1",
  hideFailureMessage: true,
  hideSuccessMessage: true,
  score: 0,
  finished: false,
  grade: "Unicorn"
}
class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.buttonClicked = this.buttonClicked.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.endOfQuiz = this.endOfQuiz.bind(this);
    this.reset = this.reset.bind(this);
  }
  reset() {
    this.setState(initialState);
  }
  buttonClicked(e) {
    e.preventDefault();
    if (this.state.questionAnswered === false){
      this.setState({
        questionAnswered: true
      });
      if (QUESTIONS[this.state.questionNo -1].answers[this.state.selctedAnswer - 1].correct === true){
        this.setState({
          correct: true,
          hideSuccessMessage: false,
          score: this.state.score + 1
        })
      } else {
        this.setState({
          correct: false,
          hideFailureMessage: false,
        })
      }
    } else {
      if (this.state.questionNo === 10){
        this.endOfQuiz();
      } else {
        this.setState({
          questionNo: this.state.questionNo + 1,
          questionAnswered: false,
          selctedAnswer: "1",
          hideSuccessMessage: true,
          hideFailureMessage: true,
        });
      }
    }
  }
  handleAnswerChange(e){
    this.setState({
      selctedAnswer: e.currentTarget.value,
    });
  }
  endOfQuiz(){
    let grade;
    let score = this.state.score;
    if (score === 10){
      grade = "Unicorn";
    } else if (score > 7){
      grade = "Dolphin";
    } else if (score > 5){
      grade = "Dog";
    } else if (score > 3){
      grade = "Worm";
    } else if (score >1){
      grade = "Tapeworm";
    } else {
      grade = "Secret Genius Unicorn";
    }
    this.setState({
      finished: true,
      grade: grade,
    });
  }
  render() {
    return(
      <div>
        <h1>React.JS Quiz</h1>
        <form style={this.state.finished? {display: 'none'} : {}}>
          <h2>Question {this.state.questionNo}</h2>
          <p>{QUESTIONS[this.state.questionNo -1].question}</p>
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="answer"
              value="1"
              checked={this.state.selctedAnswer === "1"}
              disabled={this.state.questionAnswered}
              onChange={this.handleAnswerChange}
               />{QUESTIONS[this.state.questionNo -1].answers[0].content}
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="answer"
              value="2"
              checked={this.state.selctedAnswer === "2"}
              disabled={this.state.questionAnswered}
              onChange={this.handleAnswerChange}
               />{QUESTIONS[this.state.questionNo -1].answers[1].content}
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="answer"
              value="3"
              checked={this.state.selctedAnswer === "3"}
              disabled={this.state.questionAnswered}
              onChange={this.handleAnswerChange}
               />{QUESTIONS[this.state.questionNo -1].answers[2].content}
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="answer"
              value="4"
              checked={this.state.selctedAnswer === "4"}
              disabled={this.state.questionAnswered}
              onChange={this.handleAnswerChange}
               />{QUESTIONS[this.state.questionNo -1].answers[3].content}
            </label>
          </div>
          <p className="alert alert-success"
          style={this.state.hideSuccessMessage? {display: 'none'} : {}}>
            {QUESTIONS[this.state.questionNo - 1].successMessage}
          </p>
          <p className="alert alert-danger"
          style={this.state.hideFailureMessage? {display: 'none'} : {}}>
            {QUESTIONS[this.state.questionNo - 1].failureMessage}
          </p>
          <button type="submit"
          className={this.state.questionAnswered? "btn btn-success": "btn btn-primary"}
          onClick={this.buttonClicked}>
            {this.state.questionAnswered? "Continue": "Submit"}
          </button>                          
        </form>
        <form style={!this.state.finished? {display: 'none'} : {}}>
          <h2>End Of Quiz</h2>
          <p>You scored {this.state.score} out of 10</p>
          <p>That gives you a grade of</p>
          <h2 className="display-1 jumbotron bg-light">{this.state.grade}</h2>
          <button type="submit"
          className="btn btn-info"
          onClick={this.reset}>
            Take the quiz again?
          </button>
        </form>
      </div>
    );
  }
}

export default App;