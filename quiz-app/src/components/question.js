import React from "react";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      currentQuestion: 0,
      answers: {},
    };
  }
  componentDidMount() {
    localStorage.removeItem("data");
    this.setState({
      question: this.props.state.questions,
      currentQuestion: this.props.state.currentQuestion,
      answers: this.props.state.answers,
    });
  }
  componentWillUnmount() {
    const data = {
      question: this.state.question,
      answers: this.state.answers,
      currentQuestion: this.state.currentQuestion,
    };
    localStorage.setItem("data", JSON.stringify(data));
  }

  render() {
    console.log(this.state);
    let question, index;
    if (this.state.question) {
      const copy = this.state.question.results;
      copy.map((q) => {
        if (!q.incorrect_answers.includes(q.correct_answer)) {
          q.incorrect_answers.push(q.correct_answer);
        }
        return q;
      });

      question = copy[this.state.currentQuestion];
      index = [this.state.currentQuestion];
    }
    return (
      <div className="question">
        <div className="current margin-3">
          <span className="count fs-20 yellow">{+index + 1}/10</span>
          <p className="fs-24 yellow margin-1">
            Q.{+index + 1} {question ? question.question : ""}
          </p>
          <ul className="margin-3-0">
            {question
              ? question.incorrect_answers.map((answer, i) => {
                  return (
                    <li
                      onClick={() => {
                        const object = { [index]: answer };
                        if (this.state.answers[index] === answer) {
                          const object1 = { ...this.state.answers };
                          console.log(object1);
                          delete object1[index];
                          this.setState({
                            answers: object1,
                          });
                        } else {
                          this.setState((prevState) => ({
                            answers: { ...prevState.answers, ...object },
                          }));
                        }
                      }}
                      key={i}
                      className={`fs-20 padding-1 yellow ${
                        this.state.answers[index] === answer ? "active" : ""
                      }`}
                    >
                      {i + 1}. {answer}
                    </li>
                  );
                })
              : ""}
          </ul>
          <div className="controls flex justify-space-between">
            {this.state.currentQuestion > 0 ? (
              <button
                className="fs-20 btn"
                onClick={() => {
                  if (this.state.currentQuestion > 0) {
                    this.setState((prevState) => ({
                      currentQuestion: prevState.currentQuestion - 1,
                    }));
                  }
                }}
              >
                back
              </button>
            ) : (
              <button
                className="fs-20 btn"
                onClick={() => {
                  this.props.handleState("questions", null);
                }}
              >
                Reset
              </button>
            )}
            {this.state.currentQuestion < 9 ? (
              <button
                className="fs-20 btn"
                onClick={() => {
                  if (this.state.currentQuestion < 9) {
                    this.setState((prevState) => ({
                      currentQuestion: prevState.currentQuestion + 1,
                    }));
                  }
                }}
              >
                Next
              </button>
            ) : (
              <button
                className="fs-20 btn"
                onClick={() => {
                  this.props.handleState("result", this.state);
                }}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
