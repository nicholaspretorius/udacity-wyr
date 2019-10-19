import { RECEIVE_USERS, receiveUsers } from "./../users";

describe("users", () => {
  const users = {
    brucewayne: {
      id: "brucewayne",
      name: "Bruce Wayne"
    },
    dianaprince: {
      id: "dianaprince",
      name: "Diana Prince"
    }
  };

  it("creates an action to receive the users", () => {
    const action = { type: RECEIVE_USERS, users };
    expect(receiveUsers(users)).toEqual(action);
  });
});
