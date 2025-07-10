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


const futureFeatureContainer = document.querySelector(".future-feature-container");
const futureFeatureMessage = document.querySelector(".future-feature-message");
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("post-comments")){
        futureFeatureContainer.classList.add("show");
    }

    else if(!futureFeatureMessage.contains(e.target)){
        futureFeatureContainer.classList.remove("show");
    }
            if(sideBar.classList.contains("show")&&
            !sideBar.contains(e.target) &&
            !e.target.classList.contains("menu-options") &&
            !e.target.classList.contains("toggle-menu-sidebar")){
        sideBar.classList.remove("show");
    }

})

document.addEventListener("click", (e) => {

})