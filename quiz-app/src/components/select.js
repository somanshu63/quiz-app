import React from "react";

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
    };
  }
  componentDidMount() {
    fetch("https://opentdb.com/api_category.php")
      .then((categories) => categories.json())
      .then((categories) => {
        this.setState({
          categories: categories.trivia_categories,
          category: null,
          difficulty: null,
        });
      });
  }
  handleChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  render() {
    return (
      <section className="main">
        <h1 className="text-center fs-40 text-cap green padding-2">quiz app</h1>
        <h2 className="fs-24 text-center margin-2 yellow text-cap">
          Select Quiz type
        </h2>
        <div className="form-div">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              this.props.fetchQuiz(this.state.category, this.state.difficulty);
            }}
          >
            <div className="flex justify-space-between">
              {this.state.categories ? (
                <div className="margin-1 labelselect">
                  <label className="fs-18 text-cap label lightYellow">
                    select category
                  </label>
                  <select
                    onChange={(event) => {
                      this.handleChange("category", event.target.value);
                    }}
                    className="form-control"
                  >
                    <option value="select category">Select Category</option>
                    {this.state.categories
                      ? this.state.categories.map((category) => {
                          return (
                            <option
                              className="fs-16"
                              key={category.name}
                              value={category.id}
                            >
                              {category.name}
                            </option>
                          );
                        })
                      : ""}
                  </select>
                </div>
              ) : (
                <h4 className="loading fs-20 text-center yellow margin-2">
                  Finding Categories...
                </h4>
              )}
              <div className="margin-1 labelselect">
                <label className="fs-18 text-cap label lightYellow">
                  select difficulty
                </label>
                <select
                  onChange={(event) => {
                    this.handleChange("difficulty", event.target.value);
                  }}
                  className="form-control"
                >
                  <option className="fs-16" value="">
                    Select difficulty
                  </option>
                  <option className="fs-16" value="easy">
                    Easy
                  </option>
                  <option className="fs-16" value="medium">
                    Medium
                  </option>
                  <option className="fs-16" value="hard">
                    Hard
                  </option>
                </select>
              </div>
            </div>
            <div className="form-btn-div">
              <input
                type={`submit`}
                className="form-control fs-16 text-upp form-btn"
                value={`Start`}
              ></input>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
export default Select;
