import React, { Component } from "react";

import QuestionPreview from "./QuestionPreview";

class QuestionList extends Component {
  render() {
    const { questions, title } = this.props;
    return (
      <div>
        <h3>{title}</h3>

        <ul className="question-list">
          {questions &&
            questions.map(id => (
              <li key={id}>
                <QuestionPreview id={id} />
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default QuestionList;
