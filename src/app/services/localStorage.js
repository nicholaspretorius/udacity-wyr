export function login(user) {
  localStorage.setItem("authUser", user);
}

export function logout() {
  localStorage.removeItem("authUser");
}

export function getItem(item) {
  return localStorage.getItem(item);
}
