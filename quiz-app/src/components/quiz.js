import React from "react";
import Select from "./select";
import Question from "./question";
import Result from "./result";

class Quiz extends React.Component {
  state = {
    questions: null,
    result: null,
    localStorageData: null,
    currentQuestion: 0,
    answers: {},
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
    const data = JSON.parse(localStorage.getItem("data"));
    if (data && data.question) {
      this.setState({
        localStorageData: true,
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.localStorageData ? (
          <Continue handleState={this.handleState} />
        ) : (
          ""
        )}
        {this.state.questions ? (
          !this.state.result ? (
            <>
              <nav className="flex justify-space-between nav padding-1">
                <h1 className="fs-20 green">Quiz App</h1>
                <a
                  onClick={() => {
                    this.handleState("questions", null);
                  }}
                  href="/"
                  className="btn"
                >
                  Home
                </a>
              </nav>
              <Question state={this.state} handleState={this.handleState} />
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
          <Select fetchQuiz={this.fetchQuiz} handleState={this.handleState} />
        )}
      </div>
    );
  }
}

function Continue(props) {
  return (
    <div className="continue flex justify-center padding-1">
      <h2 className="text-center yellow fs-20">Continue to previous quiz ? </h2>
      <button
        onClick={() => {
          const data = JSON.parse(localStorage.getItem("data"));
          props.handleState("questions", data.question);
          props.handleState("answers", data.answers);
          props.handleState("currentQuestion", data.currentQuestion);
          props.handleState("localStorageData", false);
        }}
      >
        yes
      </button>
      <button
        onClick={() => {
          props.handleState("localStorageData", false);
        }}
      >
        No
      </button>
    </div>
  );
}

export default Quiz;
