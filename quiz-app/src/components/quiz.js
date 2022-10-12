import React from "react";
import Select from "./select";
import Question from "./question";
import Result from "./result";

class Quiz extends React.Component {
  state = {
    questions: null,
    result: null,
    lastData: false,
  };
  fetchQuiz = (category, difficulty) => {
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          questions: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleState = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  componentDidMount() {
    if (localStorage.data) {
      const data = JSON.parse(localStorage.getItem("data"));
      this.setState({
        questions: data.question,
        lastData: true,
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.questions ? (
          !this.state.result ? (
            <>
              <nav className="flex justify-space-between nav padding-1">
                <h1 className="fs-20 green">Quiz App</h1>
                <a href="/" className="btn">
                  Home
                </a>
              </nav>
              <Question
                questions={this.state.questions}
                handleState={this.handleState}
              />
            </>
          ) : (
            <>
              <nav className="flex justify-space-between nav padding-1">
                <h1 className="fs-20 green">Quiz App</h1>
                <a href="/" className="btn">
                  Home
                </a>
              </nav>
              <Result result={this.state.result} />
            </>
          )
        ) : (
          <Select fetchQuiz={this.fetchQuiz} />
        )}
      </div>
    );
  }
}

export default Quiz;
