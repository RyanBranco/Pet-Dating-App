const reactions  = document.querySelectorAll(".reaction");
const main = document.querySelector("main");
const inputs = document.querySelector(".file-input");
const newPostFilename = document.querySelector(".filename-text");
const petSelect = document.querySelector(".pet-select");
const userPetPic = document.querySelectorAll(".pet-pic");
const userPetType = document.querySelectorAll(".pet-type");
let scrollPos;

/*- save scroll position -*/
main.onscroll = function() {
    scrollPos = main.scrollTop;
}

window.onunload = function() {
    localStorage.setItem("scrollPosition", scrollPos);
}

window.onload = function () {
    main.scrollTop = localStorage.getItem("scrollPosition");
}
/*--------------------*/

/*- change html to filename -*/
if (inputs) {
    inputs.addEventListener("change", function(e) {
        if (e.target.files[0].name) {
            newPostFilename.innerHTML = `${e.target.files[0].name}`
        }
    });
}
/*--------------------*/

/*- change pet picture and type to selected pet -*/
if (petSelect) {
    petSelect.addEventListener("change", function(e) {
        let selectedPetIndex = e.target.options.selectedIndex;
        let petPic = userPetPic[selectedPetIndex].innerHTML;
        let fullUrl = `https://pet-dating.s3-us-west-1.amazonaws.com/${petPic}`;
        let petType = userPetType[selectedPetIndex].innerHTML;
        let htmlPetPic = document.querySelector("#new-post-pet-pic");
        let htmlPetType = document.querySelector("#new-post-pet-type");
        
        htmlPetPic.setAttribute("src", fullUrl);
        htmlPetType.innerHTML = petType;
    })
}
/*--------------------*/

/*- change pet picture and type to selected pet -*/
const currentRoute = document.querySelector(".current-route").innerHTML;
if (currentRoute === "/matcher") {
    const mobileNavMatcher = document.querySelector("#nav-matcher");
    mobileNavMatcher.style.borderTop = "3px solid white";
} else if (currentRoute === "/newpost") {
    const mobileNavPost = document.querySelector("#nav-post");
    const desktopNavPost = document.querySelector("#desktop-nav-post")
    mobileNavPost.style.borderTop = "3px solid white";
    desktopNavPost.style.borderBottom = "3px solid white";
} else if (currentRoute === "/user" || currentRoute === "/user/posts") {
    const mobileNavUser = document.querySelector("#nav-user");
    const desktopNavUser = document.querySelector("#desktop-nav-user");
    mobileNavUser.style.borderTop = "3px solid white";
    desktopNavUser.style.borderBottom = "3px solid white";
} else if (currentRoute === "/user/pets") {
    const mobileNavUserpets = document.querySelector("#nav-userpets");
    const desktopNavUserpets = document.querySelector("#desktop-nav-userpets");
    mobileNavUserpets.style.borderTop = "3px solid white";
    desktopNavUserpets.style.borderBottom = "3px solid white";
}
/*--------------------*/