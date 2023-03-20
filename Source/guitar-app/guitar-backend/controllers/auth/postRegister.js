const User = require("../../models/user");
const bcrypt = require("bcryptjs");

const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //Check if the user exists
    const userExists = await User.exists({ email });

    if (userExists) {
      return res.status(409).send("Email already in use");
    }

    //Encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    //Save user object in database
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    //Create token
    const token = "JWT Token";

    res.status(201).json({
      userDetails: {
        email: user.email,
        token: token,
        username: user.username,
      },
    });
  } catch (err) {
    return res.status(500).send("Error occured. Please try again");
  }
};

module.exports = postRegister;
