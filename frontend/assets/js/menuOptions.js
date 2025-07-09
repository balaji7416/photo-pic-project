const menu = document.querySelector(".menu-options");
const sideBar = document.querySelector(".sidebar");
const menuInSidebar = document.querySelector(".toggle-menu-sidebar");

menu.addEventListener("click", () => {
    sideBar.classList.toggle("show");
})

menuInSidebar.addEventListener("click", () => {
    sideBar.classList.toggle("show");
})

document.querySelector(".toggle-dark").addEventListener("click", () =>{
    document.body.classList.toggle("dark");
})