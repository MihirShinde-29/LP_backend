const jwt = require("jsonwebtoken");
const db = require("../models");

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.status(403).send({ message: "No token provided!", success: false });
  }

  jwt.verify(token, process.env.AUTH_KEY, (err, decoded) => {
    if(err) {
      console.log(err)
      return res.status(401).send({ message: err, success: false });
    }
    console.log(decoded)
    const username = decoded.id
    db.user.findOne({'username': username}, (err, user) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!", success: false });
      }
      req.userId = user.username;
      next();
    })
  });
};

const authJwt = {
  verifyToken
};
module.exports = authJwt;