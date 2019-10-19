import { RECEIVE_QUESTIONS, receiveQuestions } from "./../questions";

describe("questions", () => {
  const questions = {
    abc: {
      author: "johndoe",
      id: "abc"
    },
    xyz: {
      author: "janedoe",
      id: "xyz"
    }
  };

  it("creates an actions to receive questions", () => {
    const action = { type: RECEIVE_QUESTIONS, questions };

    expect(receiveQuestions(questions)).toEqual(action);
  });
});
