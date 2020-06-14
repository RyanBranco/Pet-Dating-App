const Post = require("../models/post");
const Pet = require("../models/Pet");
const User = require("../models/user");
const AWS = require("aws-sdk");

let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const ID = function() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const getExtention = function(filename) {
    return filename.split('.').pop();
}

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
    User.findById(req.user._id).populate('pets').exec((err, user) => {
        res.render('user/userPets', {
            user: req.user,
            pet: user.pets,
            selected: "selected"
        })
    })
}

function showPetForm(req, res) {
    res.render('user/showPetForm', {
        user: req.user
    })
}

function addPet(req, res) {
    if (req.file) {
        req.file.originalname = ID() + "." + getExtention(req.file.originalname);
        req.body.fileId = req.file.originalname;
        const file = req.file;   

        const params = {
            Bucket: "pet-dating",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        };

        s3bucket.upload(params, function(err, data) {
            if (err) {
                res.status(500).json({ error: true, Message: err });
            } else {
                const pet = new Pet(req.body);
                pet.owner = req.user
                pet.save((err, pet) => {
                    if (err) return res.redirect('/user/pets/new');
                    req.user.pets.push(pet);
                    req.user.save((err) => {
                        if (err) return console.log(err)
                        res.redirect('/user/pets');
                    })
                })
            }
        });
    } else {
        const pet = new Pet(req.body);
        pet.owner = req.user
        pet.save((err, pet) => {
            if (err) return res.redirect('/user/pets/new');
            req.user.pets.push(pet);
            req.user.save((err) => {
                if (err) return console.log(err)
                res.redirect('/user/pets');
            })
        })
    }
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
    User.findById(req.user._id).populate('pets').exec((err, user) => {
        res.render('user/updatePet', {
            pet: user.pets[req.params.id],
            id: req.params.id,
        })
    })
}

function changePet(req, res) {
    if (req.file) {
        req.file.originalname = ID() + "." + getExtention(req.file.originalname);
        req.body.fileId = req.file.originalname;
        const file = req.file;   

        const params = {
            Bucket: "pet-dating",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        };

        s3bucket.upload(params, function(err, data) {
            if (err) {
                res.status(500).json({ error: true, Message: err });
            } else {
                User.findById(req.user._id).populate('pets').exec((err, user) => {
                    const pet = user.pets[req.params.id];
                    pet.fileId = req.body.fileId;
                    pet.name = req.body.name;
                    pet.type = req.body.type;
                    pet.gender = req.body.gender;
                    pet.sexuality = req.body.sexuality;
                    pet.save((err) => {
                        if (err) return console.log(err);
                        res.redirect("/user/pets");
                    });
                })
            }
        });
    } else {
        User.findById(req.user._id).populate('pets').exec((err, user) => {
            const pet = user.pets[req.params.id];
            pet.name = req.body.name;
            pet.type = req.body.type;
            pet.gender = req.body.gender;
            pet.sexuality = req.body.sexuality;
            pet.save((err) => {
                if (err) return console.log(err);
                res.redirect("/user/pets");
            });
        })
    }
}

function deletePet(req, res) {
    User.findById(req.user._id).populate('pets').exec((err, user) => {
        user.pets.splice(req.params.id, 1)
        user.save((err) => {
            if (err) return res.redirect(`/user/pets/update/${req.params.id}`)
            res.redirect('/user/pets')
        });
    })
}

function deletePost(req, res) {
    const postId = req.params.id;
    Post.findById((postId), (err, post) => {
        post.deleteOne((err) => {
            if (err) return res.redirect('/user/posts');
            res.redirect('/user/posts')
        })
    })
}