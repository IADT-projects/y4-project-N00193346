const Lesson = require("../models/lesson_schema");

const readData = (req, res) => {
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

  // connect to db and retrieve Lesson with :id
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
      //   data.password = ""
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error("Validation Error!", err);
        res.status(422).json({
          msg: "Validation eror",
          error: err.message,
        });
      } else {
        console.log;
      }
      console.error(err);
      res.status(500).json(err);
    });

  // connect to db, check if email exists, if yes respond with error
  // if some Lesson info is missing, respond with error

  //   if (data.password.length < 6) {
  //     res.status(422).json({
  //       msg: "User password must be over 6 characters",
  //     });
  //   } else {
  //     data.id = 1;
  //     res.status(201).json({
  //       msg: "All good",
  //       data: data,
  //     });
  //   }
};

const updateData = (req, res) => {
  let id = req.params.id;
  let body = req.body;

  // connect to db and retrieve Lesson with :id
  // if Lesson exists, validate the new Lesson info, if all good update Lesson

  Lesson.findByIdAndUpdate(id, body, {
    new: true,
  })
    .then((data) => {
      if (data) {
        res.status(201).json(data);
      } else {
        res.status(404).json({
          message: `Lesson with id: ${id} not found`,
        });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error("Validation Error!", err);
        res.status(422).json({
          msg: "Validation eror",
          error: err.message,
        });
      } else if (err.name === "CastError") {
        res.status(400).json({
          message: `Bad request, Lesson with id: ${id} is not a valid id`,
        });
      } else {
        console.log;
      }
      console.error(err);
      res.status(500).json(err);
    });
};

const deleteData = (req, res) => {
  let id = req.params.id;

  // connect to db and retrieve Lesson with :id and delete them

  Lesson.deleteOne({ _id: id })
    .then((data) => {
      if (data.deletedCount) {
        res.status(200).json({
          message: `Lesson with id: ${id} deleted successfully found`,
        });
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

module.exports = {
  readData,
  readOne,
  createData,
  updateData,
  deleteData,
};
