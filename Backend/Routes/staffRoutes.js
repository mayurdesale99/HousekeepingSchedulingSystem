const express = require("express");
const router = express.Router();
const StaffModel = require("../models/staffModel");
router.use(express.json());

router.get("/staff", async function (req, res) {
  let result = await StaffModel.find({}, { _id: 0 }).sort({ hid: 1 }).lean();
  try {
    res.send(result);
    console.table(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/staff/:id", async function (req, res) {
  var id = req.params.id;
  const data = await StaffModel.findOne({ stdid: id }, { _id: 0 }).lean();

  if (!data) return res.status(404).send(`No record with ${id}`);
  else {
    res.send(data);
    // console.log(`[Read By Id] --> ${JSON.stringify(data)}`);
    console.table(data);
  }
});
router.post("/staff", async function (req, res) {
  try {
    const newStaff = new StaffModel({
      hid: req.body.hid,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      phone: req.body.phone,
      gender: req.body.gender,
    });

    const createdStaff = await newStaff.save();
    // console.log(createdStaff);
    res.status(201).json({
      message: "Staff created successfully",
      data: createdStaff,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

router.put("/staff", async function (req, res) {
  let staffid = req.body.hid;
  let staff = await StaffModel.findOne({ hid: staffid });
  if (!staff) {
    return res
      .status(404)
      .send("The student you are trying to update does not exist.");
  } else {
    //update the fields that have been sent in the request body
    staff.fname = req.body.name;
    staff.lname = req.body.name;
    staff.email = req.body.email;
    staff.country = req.body.country;
    staff.state = req.body.state;
    staff.city = req.body.city;
    staff.phone = req.body.phone;
    // staff.gender = req.body.gender;
    const updatedStaff = await staff.save();
    res.status(200).json({
      message: "Staff updated successfully",
      data: updatedStaff,
    });
  }
});

router.delete("/staff/remove/:id", async function (req, res) {
  try {
    const removed = await StaffModel.findOneAndDelete({
      stdid: req.params.id,
    });

    if (!removed) {
      return res.status(404).json("No student with provided id found!");
    } else {
      res.status(200).json({
        message: "Student deleted successfully",
        data: removed,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
});
module.exports = router;
