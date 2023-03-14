const express = require("express");
const router = express.Router();

const { register, login, readAll } = require("../controllers/user_controller");

router.post("/login", login).post("/register", register).get("/", readAll);

module.exports = router;
