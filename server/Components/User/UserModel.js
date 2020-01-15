const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "A user must have a name!"],
    trim: true,
    unique: true,
    minlength: [3, "A name cannot be smaller than 3 characters!!"]
  },
  email: {
    type: String,
    required: [true, "A user must have an Email Address!"],
    trim: true,
    unique: true,
    validate: [validator.default.isEmail, "Invalid Email"]
  },
  img: String,
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ],
  
  password: {
    type: String,
    minlength: [8, "A password must be more than 8 characters long!"],
    trim: true,
    required: [true, "A password is required!"],
    select: false
  }
});

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
