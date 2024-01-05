const path = require("path");
const User = require("../models/userModel");

const homeController = {};

homeController.index = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
};

homeController.saveUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const newUser = await User.create({
      name,
      email,
      phone,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = homeController;
