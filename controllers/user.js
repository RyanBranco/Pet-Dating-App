const Post = require("../models/post");

module.exports = {
    show,
    showPets,
    showPetForm,
    addPet,
    showPosts,
    showComments,
    updateUser,
    updatePet,
    changePet
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
    req.user.pets.push(req.body);
    req.user.save((err) => {
        if (err) return res.redirect('/user/pets/new');
        res.redirect('/user/pets');
    })
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

function updateUser(req, res) {
    res.redirect('/user')
}

function updatePet(req, res) {
    res.render('user/updatePet', {
        id: req.params.id,
        user: req.user
    })
}

function changePet(req, res) {
    const pet = req.user.pets[req.params.id];
    pet.avatar = req.body.avatar;
    pet.name = req.body.name;
    pet.type = req.body.type;
    pet.gender = req.body.gender;
    pet.sexuality = req.body.sexuality;
    req.user.save((err) => {
        if (err) return console.log(err);
        res.redirect("/user/pets");
    });
}