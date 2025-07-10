const API_URL = " https://photo-pic-project-backend.onrender.com/api/";

const registerUser = async (e) => {
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();
  const email = document.querySelector("#email").value.trim();
  try {
    const res = await fetch(API_URL + "auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    const data = await res.json();
    if (res.ok) {
      window.location.href = "../../index.html";
      alert("Registration successful! Please Log in.");
    } else {
      alert("Registration failed: " + (data.message || "unknown error"));
    }
  } catch (err) {
    console.log("registeration error: ", err);
    alert("an error occurred during registrtaion.");
  }
};



// even listeners for the buttons
document.querySelector(".register-form").addEventListener("submit", (e) => {
  e.preventDefault()
  registerUser();
});


