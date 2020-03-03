module.exports = {
    show,
    showPets,
    showPetForm,
    addPet,
    showPosts,
    showComments
}

function show(req, res) {
    res.render('user/userDetails', {
        
    })
}

function showPets(req, res) {
    res.render('user/userPets', {

    })
}

function showPetForm(req, res) {
    res.render('user/showPetForm')
}

function addPet(req, res) {
    res.redirect('/user/pets')
}

function showPosts(req, res) {
    res.render('user/posts')
}

function showComments(req, res) {
    res.render('user/comments')
}