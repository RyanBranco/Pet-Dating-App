const Post = require("../models/post");

module.exports = {
    show,
    showPets,
    showPetForm,
    addPet,
    showPosts,
    updateUser,
    updatePet,
    changePet,
    deletePet,
    deletePost
}

function show(req, res) {
    res.render('user/userDetails', {
        user: req.user
    })
}

function showPets(req, res) {
    res.render('user/userPets', {
        user: req.user,
        selected: "selected"
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
    Post.find({user: req.user.id}, (err, posts) => {
        res.render('user/posts', {
            user: req.user,
            posts
        })
    })
}

function updateUser(req, res) {
    const user = req.user;
    user.name = req.body.name;
    user.save((err) => {
        res.redirect('/user');
    })
}

function updatePet(req, res) {
    res.render('user/updatePet', {
        pet: req.user.pets[req.params.id],
        id: req.params.id
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

function deletePet(req, res) {
    const pet = req.user.pets[req.params.id];
    pet.remove((err) => {
        if (err) return res.redirect(`/user/pets/update/${req.params.id}`)
        req.user.save((err) => {
            if (err) return res.redirect(`/user/pets/update/${req.params.id}`)
            res.redirect('/user/pets')
        })
    });
}

function deletePost(req, res) {
    const postId = req.user.posts[req.params.id];
    Post.findById((postId), (err, post) => {
        post.deleteOne((err) => {
            if (err) return res.redirect('/user/posts');
        })
        // remove reference to post from user!!!!
    })
}