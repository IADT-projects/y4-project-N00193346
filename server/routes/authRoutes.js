const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(4).max(12).required(),
  email: Joi.string().email().required(),
  account: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(4).max(12).required(),
  email: Joi.string().email().required(),
});

router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);
router.post(
  "/login",
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);

//Test route for middlware
router.get("/test", auth, (req, res) => {
  res.send("request passed");
});

module.exports = router;
