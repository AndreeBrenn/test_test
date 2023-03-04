const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const users = require("../models/userModel");
const jwt = require("jsonwebtoken");

//REGISTER USER
const register = asyncHandler(async (req, res) => {
  const { LastName, FirstName, MiddleName, Username, Password, Email } =
    req.body;
  try {
    const userExist = await users.findOne({ Email, Username });

    //CHECK IF EXIST
    if (userExist) {
      res.status(400);
      throw new Error("user Already Exist!");
    }

    //HASH PASSWORD
    const salt = await bcrypt.genSaltSync(10);
    const hashedPw = await bcrypt.hashSync(Password, salt);

    const user = await users.create({
      LastName,
      FirstName,
      MiddleName,
      Username,
      Email,
      Password: hashedPw,
    });

    return res.status(200).json(user);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

//LOGIN USER
const login = asyncHandler(async (req, res) => {
  const { Username, Password } = req.body;
  try {
    const user = await users.findOne({ Username });
    if (!user) {
      res.status(404);
      throw new Error("User Not Found!");
    }

    const isPasswordCorrect = await bcrypt.compareSync(Password, user.Password);

    const token = generateToken(
      user._id,
      user.Username,
      user.LastName,
      user.FirstName,
      user.MiddleName
    );

    if (isPasswordCorrect) {
      return res
        .status(200)
        .cookie("user_token", token, {
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 1),
        })
        .json(token);
    } else {
      res.status(409);
      throw new Error("Wrong Credentials");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

//GENERATE TOKEN
const generateToken = (id, username, LastName, FirstName, MiddleName) => {
  return jwt.sign(
    { id, username, LastName, FirstName, MiddleName },
    process.env.JWT_SECRET,
    { expiresIn: "10h" }
  );
};

module.exports = {
  register,
  login,
};
