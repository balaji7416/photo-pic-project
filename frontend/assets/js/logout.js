const logOut = () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not loggedin");
      return;
    }
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    window.location.href = "login.html";
    alert("logged out successfully");
  } catch (err) {
    alert("something went wrong...failed to logout");
  }
};

document.querySelector(".logout").addEventListener("click", () => {
  logOut();
});
