const errors = require("restify-errors");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const config = require("../common/config");
const auth = require("../common/helpers/auth");
const jwt = require("jsonwebtoken");

module.exports = app => {
  //Register User
  app.post("/register", async (req, res, next) => {
    //Check for content type
    if (!req.is("application/json")) {
      return next(new errors.BadRequestError("Expects 'application/json'"));
    }

    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        //Hash Password
        user.password = hash;
        //Save the User
        try {
          const newUSer = await user.save();
          //Send created status
          res.send(201);
          next();
        } catch (err) {
          return next(new errors.InternalError(err.message));
        }
      });
    });
  });
  //Authenticate User
  app.post("/auth", async (req, res, next) => {
    if (!req.is("application/json")) {
      return next(new errors.BadRequestError("Expects 'application/json'"));
    }
    const { email, password } = req.body;
    try {
      const user = await auth.authenticate(email, password);
      //Create Token
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: "15m"
      });

      const { iat, exp } = jwt.decode(token);
      const jwt_token = "jwt " + token;

      //Respond with token
      res.send({ iat, exp, token: jwt_token });
      next();
    } catch (err) {
      //User unauthorised
      return next(new errors.UnauthorizedError(err));
    }
  });

  //Get Users
  app.get("/users", async (req, res, next) => {
    try {
      const users = await User.find({});
      if (config.ENV == "Development") {
        res.send(users);
        next();
      } else {
        return next(new errors.ForbiddenError());
      }
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });
};
