export function login(user) {
  try {
    localStorage.setItem("authUser", user);
  } catch (e) {
    console.warn("There was an error saving the authenticated user", e);
  }
}

export function logout() {
  try {
    localStorage.removeItem("authUser");
  } catch (e) {
    console.warn("There was an error removing the authenticated user", e);
  }
}

export function getItem(item) {
  try {
    return localStorage.getItem(item);
  } catch (e) {
    console.warn("There was an error getting the item", e);
  }
}

export function getCurrentUser() {
  try {
    return localStorage.getItem("authUser") ? localStorage.getItem("authUser") : "";
  } catch (e) {
    console.log("No authenticated user", e);
  }
}
