import mongoose from "mongoose";
import crypto from "crypto";
import * as Schema from "./schema.js";
import validationHandler from "../../lib/validation.js";

const UserModel = mongoose.model("User");

const Model = {
  async all() {
    try {
      const users = await UserModel.find({});
      return users;
    } catch (e) {
      console.log(e);
      return "Error Processing data";
    }
  },
  async authenticate(email, password) {
    const user = await UserModel.findOne({
      email: email,
    });
    const passwordHash = crypto
      .pbkdf2Sync(password, user.salt, 100, 64, `sha512`)
      .toString(`hex`);

    if (passwordHash === user.hash) {
      return { user: user, errors: null };
    } else {
      return { user: null, errors: [{type: 'VALIsxlksjld', message: 'Invalid credentials'}] };
    }
  },
  async get(id = null) {
    if (id) {
      try {
        const user = await UserModel.findById(id);
        return user;
      } catch (e) {
        console.log(e);
        return "Error Processing data";
      }
    }
  },
  async save(data = null) {
    try {
      const userDoc = new UserModel({ ...data });
      const errors = validationHandler.handleValidationErrors(
        userDoc.validateSync()
      );
      if (!errors) {
        const retVal = await userDoc.save();
        return { user: retVal, errors: null };
      }
      return { user: null, errors: errors };
    } catch (err) {
      // Handle Error on a separate file
      if (err.code === 11000) {
        const fieldName = Object.keys(err.keyPattern)[0];
        return {
          user: null,
          errors: [
            {
              type: err.name,
              message: `${fieldName} already exists`,
            },
          ],
        };
      }
    }
  },
};

export default Model;
