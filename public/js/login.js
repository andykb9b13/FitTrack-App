const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  console.log("This is the email", email);
  console.log("This is the password", password);

  if (email && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    console.log("this is the response", response);

    if (response.ok) {
      // sessionStorage.setItem("email", email);
      document.location.replace("/profile");

      alert("Login Successful");
    } else {
      alert("Login failed");
    }
  }
};

const signupRedirect = async (event) => {
  event.preventDefault();
  document.location.replace("/signup");
};

document.querySelector("#loginBtn").addEventListener("click", loginFormHandler);

document.querySelector("#signupBtn").addEventListener("click", signupRedirect);
