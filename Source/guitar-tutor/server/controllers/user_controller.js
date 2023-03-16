const User = require("../models/user_schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    let newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);

    console.log(newUser);

    const user = await newUser.save();
    user.password = undefined;
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({
      msg: err,
    });
  }
};

const login = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user || !user.comparePassword(req.body.password)) {
        res.status(401).json({
          msg: "Authentication failed. Invalid user or password",
        });
      } else {
        //generate a token
        let token = jwt.sign(
          {
            email: user.email,
            name: user.name,
            _id: user._id,
            role: user.role,
          },
          process.env.APP_KEY
        );
        res.status(200).json({
          msg: "Signed in",
          token,
          _id: user._id,
          role: user.role,
        });
      }
    })
    .catch((err) => {
      throw err;
    });
};

const readOne = (req, res) => {
  let id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: `User with id: ${id} not found`,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res.status(400).json({
          message: `Bad request, User with id: ${id} is not a valid id`,
        });
      } else {
        res.status(500).json(err);
      }
    });
};

const readAll = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json("Unauthorized Access");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.APP_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json("Unauthorized Access");
    }
    if (decoded.role === "instructor") {
      User.find()
        .then((data) => {
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
    } else {
      res.status(401).json("Unauthorized Access");
    }
  });
};

module.exports = {
  register,
  login,
  readAll,
  readOne,
};
