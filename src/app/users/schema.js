import mongoose from "mongoose";
import crypto from "crypto";
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    default: "author"
  },
  date: {
    type: Date,
    default: Date.now
  },
  salt: {
    type: String
  },
});

userSchema.pre("save", function (next) {
  try {
    this.salt = crypto.randomBytes(16).toString("hex");
    // Hashing user's salt and password with 100 iterations,
    this.password = crypto
      .pbkdf2Sync(this.password, this.salt, 100, 64, 'sha512')
      .toString(`hex`);
    next();
  } catch (err) {
    throw new Error(err);
  }
});

mongoose.model("User", userSchema);