const express = require("express");
const router = express.Router();

const {
  register,
  login,
  readAll,
  readOne,
} = require("../controllers/user_controller");

router
  .post("/login", login)
  .post("/register", register)
  .get("/", readAll)
  .get("/:id", readOne);

module.exports = router;
