// needed packages Import
const mongoose = require("mongoose");
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
    },
    password: {
      type: String,
      required: true
    },
    phone: {type : Number , required :false },
    image: {type : String , required : false },
  },
  { versionKey: false, timestamps: true }
);
// create the user model
const User = mongoose.model("Users", userSchema);

module.exports = User;
