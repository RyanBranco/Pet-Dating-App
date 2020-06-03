let reactions  = document.querySelectorAll(".reaction");

for (let i = 0; i < reactions.length; i++) {
    reactions[i].addEventListener("click", function(e) {
        e.preventDefault()
    })
}