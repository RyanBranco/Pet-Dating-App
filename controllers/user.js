module.exports = {
    show,
    showPets,
    showPetForm,
    addPet,
    showPosts,
    showComments,
    update
}

function show(req, res) {
    res.render('user/userDetails', {
        user: req.user
    })
}

function showPets(req, res) {
    res.render('user/userPets', {
        user: req.user
    })
}

function showPetForm(req, res) {
    res.render('user/showPetForm')
}

function addPet(req, res) {
    res.redirect('/user/pets')
}

function showPosts(req, res) {
    res.render('user/posts', {
        user: req.user
    })
}

function showComments(req, res) {
    res.render('user/comments', {
        user: req.user
    })
}

function update(req, res) {
    res.redirect('/user')
}