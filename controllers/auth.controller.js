const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.user;

exports.signup = (req, res) => {
  bcrypt.genSalt(8, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
          res.status(500).send({ message: err, success: false });
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
        res.status(500).send({ message: err, success: false });
        throw err;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found.", success: false });
      }

      var passwordIsValid = bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!", success: false });
      }

      var token = jwt.sign({ id: req.body.username, email: req.body.email }, process.env.AUTH_KEY, {
        expiresIn: '1h',
      });

      res.status(200).send({
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        token: token,
        success: true,
      });
    });
};