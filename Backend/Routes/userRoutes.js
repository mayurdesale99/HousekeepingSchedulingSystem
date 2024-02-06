// Import required modules
const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel");
router.use(express.json());
// Add any other required modules here

// Define routes and middleware
router.get("/users", async function (req, res) {
  let result = await UserModel.find({}, { _id: 0 }).sort({ emailid: 1 }).lean();
  try {
    res.send(result);
    console.table(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/register/user", async function (req, res) {
  try {
    const email = req.body.emailid;
    const password = req.body.password;
    const question = req.body.question;
    const answer = req.body.answer;

    // Check if the user already exists
    // const existingUser = await UserModel.findOne({ emailid: email });
    // if (existingUser) {
    //   console.log("Existing User");
    //   return res.status(400).json({ message: "User already exists" });
    // }

    // Create a new user object
    const newUser = new UserModel({
      emailid: req.body.emailid,
      password: req.body.password,
      question: req.body.question,
      answer: req.body.answer,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // console.error("Error creating user", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});
router.put("/modify/user", async (req, res) => {
  try {
    let emailid = req.body.emailid;
    let user = await UserModel.findOne({ emailid: emailid });
    if (!user) {
      return res.status(404).send("The User Does not Exists");
    } else {
      // user.emailid = req.body.emailid;
      user.password = req.body.password;
      const UpdatedUser = await user.save();
      res.status(200).json({ message: "User Updated", data: UpdatedUser });
    }
  } catch (error) {
    console.log("Error in updating user ", error);
  }
});
module.exports = router;
