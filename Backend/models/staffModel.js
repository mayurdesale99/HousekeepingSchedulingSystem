const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HousekeepingDb");

var Schema = mongoose.Schema;

var staffSchema = new Schema(
  {
    hid: Number,
    fname: String,
    lname: String,
    email: String,
    country: String,
    state: String,
    city: String,
    phone: Number,
    gender: String,
  },
  { versionKey: false }
);

var StaffModel = mongoose.model("Housekeepers", staffSchema, "Housekeepers");

module.exports = StaffModel;
