let reactions  = document.querySelectorAll(".reaction");
const page = document.querySelector(".page");
let scrollPos;

page.onscroll = function() {
    scrollPos = page.scrollTop;
}

window.onunload = function() {
    localStorage.setItem("scrollPosition", scrollPos);
}

window.onload = function () {
    page.scrollTop = localStorage.getItem("scrollPosition");
}

for (let i = 0; i < reactions.length; i++) {
    reactions[i].addEventListener("click", function(e) {    

    })
}