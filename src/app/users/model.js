import mongoose from "mongoose";
import crypto from "crypto";
import * as Schema from "./schema.js";
import validationHandler from "../../lib/validation.js";
import Util from "../../lib/util.js";

const UserModel = mongoose.model("User");

const Model = {
  async all() {
    try {
      const users = await UserModel.find({});
      return { user: users, success: true, errors: [] };
    } catch (e) {
      return {
        users: null,
        success: false,
        errors: [{ type: "ERROR", message: e.message }],
      };
    }
  },
  async authenticate(email, password) {
    const user = await UserModel.findOne({
      email: email,
    });

    if (user) {
      const passwordHash = crypto
        .pbkdf2Sync(password, user.salt, 100, 64, "sha512")
        .toString(`hex`);

      if (user && passwordHash === user.password) {
        const token = await Util.generateToken(user);
        return { token: token, success: true, errors: [] };
      } else {
        return {
          token: "",
          success: false,
          errors: [{ type: "ERROR", message: "Invalid credentials" }],
        };
      }
    } else {
      return {
        token: "",
        success: false,
        errors: [{ type: "ERROR", message: "Invalid credentials" }],
      };
    }
  },
  async get(id = null) {
    if (id) {
      try {
        const user = await UserModel.findById(id);
        return { user: user, success: true, errors: [] };
      } catch (e) {
        return {
          user: null,
          success: false,
          errors: [{ type: "ERROR", message: e.message }],
        };
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
        return { user: retVal, success: true, errors: [] };
      }

      return { user: null, success: false, errors: errors };
    } catch (err) {
      // Handle Error on a separate file
      if (err.code === 11000) {
        const fieldName = Object.keys(err.keyPattern)[0];
        return {
          user: null,
          success: false,
          errors: [
            {
              type: "ERROR",
              message: `${fieldName} already exists`,
            },
          ],
        };
      }
    }
  },
};

export default Model;
