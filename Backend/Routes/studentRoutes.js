const express = require("express");
const router = express.Router();
const StudentModel = require("../models/studentModel");
router.use(express.json());

router.get("/students", async function (req, res) {
  let result = await StudentModel.find({}, { _id: 0 })
    .sort({ stdid: 1 })
    .lean();
  try {
    res.send(result);
    console.table(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/students/:id", async function (req, res) {
  var id = req.params.id;
  const data = await StudentModel.findOne({ stdid: id }, { _id: 0 }).lean();

  if (!data) return res.status(404).send(`No record with ${id}`);
  else {
    res.send(data);
    // console.log(`[Read By Id] --> ${JSON.stringify(data)}`);
    console.table(data);
  }
});
router.post("/students", async function (req, res) {
  try {
    const newStudent = new StudentModel({
      stdid: req.body.stdid,
      name: req.body.name,
      contact: req.body.contact,
      ftmarks: req.body.ftmarks,
      stmarks: req.body.stmarks,
      remark: req.body.remark,
      email: req.body.email,
    });

    const createdStudent = await newStudent.save();
    // console.log(createdStudent);
    res.status(201).json({
      message: "Student created successfully",
      data: createdStudent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

router.put("/students", async function (req, res) {
  let studentid = req.body.stdid;
  let student = await StudentModel.findOne({ stdid: studentid });
  if (!student) {
    return res
      .status(404)
      .send("The student you are trying to update does not exist.");
  } else {
    //update the fields that have been sent in the request body
    student.name = req.body.name;
    student.contact = req.body.contact;
    student.ftmarks = req.body.ftmarks;
    student.stmarks = req.body.stmarks;
    student.remark = req.body.remark;
    student.email = req.body.email;
    const updatedStudent = await student.save();
    res.status(200).json({
      message: "Student updated successfully",
      data: updatedStudent,
    });
  }
});

router.delete("/students/remove/:id", async function (req, res) {
  try {
    const removed = await StudentModel.findOneAndDelete({
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
