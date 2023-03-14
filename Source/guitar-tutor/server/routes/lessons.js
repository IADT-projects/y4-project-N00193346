const express = require("express");
const router = express.Router();

const {
  readAll,
  readOne,
  createData,
  updateData,
  deleteData,
} = require("../controllers/lesson_controller");

router
  .get("/", readAll)
  .get("/:id", readOne)
  .post("/", createData)
  .put("/:id", updateData)
  .delete("/:id", deleteData);

module.exports = router;
