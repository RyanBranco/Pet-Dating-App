let updateButton = document.querySelector("#update");

updateButton.addEventListener("click", () => {
    updateButton.value = "Updated!";
    setTimeout(() => {
        updateButton.value = "Update User";
    }, 3000);
});