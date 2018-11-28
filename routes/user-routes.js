


const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const ensureLogin = require("connect-ensure-login");



router.get('/signup', (req, res, next)=>{
  res.render('users/signup', {message: req.flash('error')});
});

router.post('/signup', (req, res, next)=>{
  User.findOne({username: req.body.username})
  .then((user)=>{
    if(user != null){
      req.flash('error', 'This username is taken. Please chose another one.')
      res.redirect('/user/signup'); 
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    User.create(req.body)
    .then(()=>{
      res.redirect('/');
    })
    .catch((err)=>{
      next(err)
    })
  })
  .catch((err)=>{
    next(err);
  })
});

router.get('/logout', (req, res)=>{
  req.logout();
  req.flash('success', 'Log out succesfully')
  res.redirect('/');
});


router.get("/login", (req, res, next) => {
  res.render("users/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/user/profile",
  failureRedirect: "/user/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});


router.get("/profile", ensureLogin.ensureLoggedIn('/user/login'), (req, res) => { 
    res.render("users/profile", { user: req.user });
});







module.exports = router;


