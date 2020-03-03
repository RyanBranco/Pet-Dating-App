module.exports = {
    show,
    showPets
}

function show(req, res) {
    res.render('user/userDetails', {

    })
}

function showPets(req, res) {
    res.render('user/userPets', {

    })
}