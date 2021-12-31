const isLoggedIn = () => {
  // user info can be loaded after refresh
  console.log(window.localStorage.getItem("token"));
  return !!window.localStorage.getItem("token"); // !! : cast to boolean
};

const Auth = {
  isAuthenticated: isLoggedIn(),
  authenticate() {
    this.isAuthenticated = true;
  },
  signout() {
    this.isAuthenticated = false;
    window.localStorage.clear();
  },
  getAuth() {
    return this.isAuthenticated;
  },
};

export default Auth;
