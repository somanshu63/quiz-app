import React from "react";

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
    };
  }
  componentDidMount() {
    localStorage.removeItem("data");
    this.setState({
      result: this.props.result,
    });
  }
  render() {
    let answers, questions, correctAnswers, isCorrect, total;
    if (this.state.result) {
      answers = this.state.result.answers;
      questions = this.state.result.question.results.map((q) => q.question);
      correctAnswers = this.state.result.question.results.map(
        (q) => q.correct_answer
      );
      isCorrect = correctAnswers.map((cA, i) => {
        if (cA === answers[i]) {
          return <i class="fa-solid green fa-circle-check"></i>;
        } else {
          return <i class="fa-solid red fa-circle-xmark"></i>;
        }
      });
      total = isCorrect.filter(
        (a) => a.props.class === "fa-solid green fa-circle-check"
      ).length;
    }
    return (
      <div className="result">
        <h2 className="text-center padding-3 fs-28 green">Result</h2>
        <table className="">
          <tbody>
            <tr>
              <th className="fs-20 text-center green padding-1 ">Question</th>
              <th className="fs-20 text-center green padding-1 ">
                Your Answer
              </th>
              <th className="fs-20 text-center green padding-1 ">
                Correct Answer
              </th>
              <th className="fs-20 text-center green padding-1 ">
                Right/ Wrong
              </th>
            </tr>
            {questions
              ? questions.map((q, i) => {
                  return (
                    <tr key={i}>
                      <td className="fs-18 padding-1 lightYellow question-block">
                        {q}
                      </td>
                      <td className="fs-18 padding-1 lightYellow text-center  answer-block">
                        {answers[i]}
                      </td>
                      <td className="fs-18 padding-1 lightYellow text-center  correct-answer-block">
                        {correctAnswers[i]}
                      </td>
                      <td className="fs-18 padding-1 lightYellow text-center  is-correct-block">
                        {isCorrect[i]}
                      </td>
                    </tr>
                  );
                })
              : ""}
            <tr>
              <td className="fs-20 text-center green padding-1">
                Total Correct:
              </td>
              <td></td>
              <td></td>
              <td className="fs-20 text-center green padding-1">{total}/10</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Result;
