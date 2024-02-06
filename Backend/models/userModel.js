const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HousekeepingDb");

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    reqid: String,
    date: String,
    timings: String,
    hid: Number,
    status: String,
    stdid: Number,
  },
  { versionKey: false }
);

var UserModel = mongoose.model("users", userSchema, "users");
module.exports = UserModel;
