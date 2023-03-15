const loginRedirect = async () => {
  document.location.replace("/login");
};

const signupRedirect = async () => {
  document.location.replace("/signup");
};

document.querySelector("#loginBtn").addEventListener("click", loginRedirect);

document.querySelector("#signupBtn").addEventListener("click", signupRedirect);
