const API_URL = "http://localhost:5000/api/";

const loginUser = async () => {
  const username = document.querySelector("#login-username").value.trim();
  const password = document.querySelector("#login-password").value.trim();

  try {
    const res = await fetch(API_URL + "auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      localStorage.setItem("userId",data._id);
      window.location.href = "./feed.html";
      alert("Login successful! welcome " + data.username);
    } else {
      alert("Login failed: " + (data.message || "unknown error"));
    }
  } catch (err) {
    console.log("login error: ", err);
    alert("An error during login.");
  }
};

document.querySelector(".register-form").addEventListener("submit", (e) => {
  e.preventDefault()
  loginUser();
});