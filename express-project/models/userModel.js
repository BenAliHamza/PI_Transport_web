// needed packages Import
const mongoose = require("mongoose");
const {EMAIL_REGEX, PASSWORD_REGEX} = require("../shared/services/commonService");
const { Schema } = mongoose;

// user schema

const userSchema = new Schema(
  {
    pseudo: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: EMAIL_REGEX,
    },
    password: {
      type: String,
      required: true ,
      match: PASSWORD_REGEX,
    },
    phone: {type : Number , required :false },
    image: {type : String , required : false },
  },
  { versionKey: false, timestamps: true }
);
// create the user model
const User = mongoose.model("Users", userSchema);

module.exports = User;
