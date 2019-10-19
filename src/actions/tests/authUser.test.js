import { SET_AUTH_USER, LOGOUT_AUTH_USER, setAuthUser, logoutAuthUser } from "./../authUser";

describe("authUser", () => {
  const id = "tylermcginnis";

  it("creates an action to set the auth user", () => {
    const action = { type: SET_AUTH_USER, id };
    expect(setAuthUser(id)).toEqual(action);
  });

  it("creates an action to logout the auth user", () => {
    const action = { type: LOGOUT_AUTH_USER, id };
    expect(logoutAuthUser(id)).toEqual(action);
  });
});
