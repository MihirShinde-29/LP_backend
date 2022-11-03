const verifySignUp = require("../middlewares/verifySignup");
const authJwt = require("../middlewares/auth");
const authController = require("../controllers/auth.controller");
const newsController = require("../controllers/news.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    verifySignUp.checkDuplicateUsernameOrEmail,
    authController.signup
  );
  
  app.post("/api/auth/signin", authController.signin);
  
  app.get(
    "/news",
    authJwt.verifyToken,
    newsController.getNews
  );
};