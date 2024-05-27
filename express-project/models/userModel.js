const mongoose = require("mongoose");
const {EMAIL_REGEX, PASSWORD_REGEX , ROLE_REGEX ,STATUS_REGEX} = require("../shared/services/commonService");
const { Schema } = mongoose;

// user schema

const userSchema = new Schema(
  {
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
    },
    phone: {type : Number , required :false },
    image: {type : String , required : false },
    role: {
      type: String,
      required: false,
      default: "DEFAULT",
      match: ROLE_REGEX, // Only allows uppercase letters and underscores
    },
    status: {
      type: String,
      required: false,
      default: "PENDING",
      match: STATUS_REGEX, // Only allows specific statuses
    }
  },
  { versionKey: false, timestamps: true }
);
// create the user model
const User = mongoose.model("Users", userSchema);

module.exports = User;
