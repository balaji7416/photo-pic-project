const user = localStorage.getItem("username");
const email = localStorage.getItem("email");

const usernameField = document.querySelector(".username");
usernameField.textContent = user;

const profilePopup = document.querySelector(".profile-popUp");

usernameField.addEventListener("click", () => {
    profilePopup.classList.add("show");
})

const sidebar = document.querySelector(".sidebar");
document.querySelector(".profile").addEventListener("click", () => {
    profilePopup.classList.add("show");
    sideBar.classList.remove("show");

})


const profileEmail = document.querySelector(".profile-email");
const profileUsername = document.querySelector(".profile-username");

profileEmail.textContent = email;
profileUsername.textContent = user;

profileCancelBtn = document.querySelector(".cancel-profile");
profileCancelBtn.addEventListener("click", () => {
    profilePopup.classList.remove("show");
})

const profileOptions = document.querySelector(".profile-options")
document.addEventListener("click", (e) => {
    if(!profileOptions.contains(e.target) && 
        !e.target.classList.contains("profile") &&
        !e.target.classList.contains("username")){
        profilePopup.classList.remove("show");
    }
})