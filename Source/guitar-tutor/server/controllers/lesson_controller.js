const Lesson = require("../models/lesson_schema");

// Update the readData function
const readAll = (req, res) => {
  Lesson.find()
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json("Working but none here");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

const readOne = (req, res) => {
  let id = req.params.id;

  Lesson.findById(id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: `Lesson with id: ${id} not found`,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res.status(400).json({
          message: `Bad request, Lesson with id: ${id} is not a valid id`,
        });
      } else {
        res.status(500).json(err);
      }
    });
};

const createData = (req, res) => {
  let lessonData = req.body;

  Lesson.create(lessonData)
    .then((data) => {
      console.log("New Lesson created", data);
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error("Validation Error!", err);
        res.status(422).json({
          msg: "Validation error",
          error: err.message,
        });
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

const updateData = (req, res) => {
  let id = req.params.id;
  let body = req.body;

  Lesson.findByIdAndUpdate(id, body, { new: true })
    .then((data) => {
      if (data) {
        res.status(201).json(data);
      } else {
        res.status(404).json({ message: `Lesson with id: ${id} not found` });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error("Validation Error!", err);
        res.status(422).json({ msg: "Validation error", error: err.message });
      } else if (err.name === "CastError") {
        res.status(400).json({
          message: `Bad request, Lesson with id: ${id} is not a valid id`,
        });
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

const deleteData = (req, res) => {
  let id = req.params.id;

  Lesson.deleteOne({ _id: id })
    .then((data) => {
      if (data.deletedCount) {
        res
          .status(200)
          .json({ message: `Lesson with id: ${id} deleted successfully` });
      } else {
        res.status(404).json({ message: `Lesson with id: ${id} not found` });
      }
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res.status(400).json({
          message: `Bad request, Lesson with id: ${id} is not a valid id`,
        });
      } else {
        res.status(500).json(err);
      }
    });
};

module.exports = {
  readAll,
  readOne,
  createData,
  updateData,
  deleteData,
};
