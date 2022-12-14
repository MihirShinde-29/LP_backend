const db = require("../models");

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    db.user.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err, success: false });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!", success: false });
            return;
        }

        // Email
        db.user.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err, success: false });
                return;
            }

            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!", success: false });
                return;
            }

            next();
        });
    });
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail
};
  
module.exports = verifySignUp;