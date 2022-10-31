const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.user;

exports.signup = (req, res) => {
  bcrypt.genSalt(8, (err, salt) => {
    console.log(req.body)
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        console.log(hash, salt)
        if (err) {
          res.status(500).send({ message, success: false });
          throw err;
        }
    
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: hash,
        });
    
        user.save((err, user) => {
          if (err) {
            res.status(500).send({ message: err, success: false });
            return;
          }
    
          res.status(201).send({ 
            message: "User was registered successfully!",
            success: true,
          });
        });
      })
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        throw err;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      var token = jwt.sign({ id: user.id }, process.env.AUTH_KEY, {
        expiresIn: 86400,
      });

      req.session.token = token;

      res.status(200).send({
        username: user.username,
        email: user.email,
        fullName: user.fullName,
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};