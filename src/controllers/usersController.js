const { v4: uuidv4 } = require("uuid");
const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const newUser = {
      id: uuidv4(),
      name,
    };

    const savedUser = await User.createUser(newUser);

    return res.status(201).json({
      success: true,
      message: "User created",
      data: savedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
