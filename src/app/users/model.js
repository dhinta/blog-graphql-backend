import mongoose from "mongoose";
import crypto from "crypto";
import * as Schema from "./schema.js";
import validationHandler from "../../lib/validation.js";

const UserModel = mongoose.model("User");

const Model = {
  async all() {
    try {
      const users = await UserModel.find({});
      return { user: users, success: true, messages: [] };
    } catch (e) {
      return {
        users: null,
        success: false,
        messages: [{ type: "ERROR", message: e.message }],
      };
    }
  },
  async authenticate(args) {
    const user = await UserModel.findOne({
      email: args.email,
    });

    if (user && passwordHash === user.password) {
      const passwordHash = crypto
        .pbkdf2Sync(args.password, user.salt, 100, 64, "sha512")
        .toString(`hex`);

      return { user: user, success: true, messages: [] };
    } else {
      return {
        user: null,
        success: true,
        messages: [{ type: "ERROR", message: "Invalid credentials" }],
      };
    }
  },
  async get(id = null) {
    if (id) {
      try {
        const user = await UserModel.findById(id);
        return { user: user, success: true, messages: [] };
      } catch (e) {
        return {
          user: null,
          success: false,
          messages: [{ type: "ERROR", message: e.message }],
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
        return { user: retVal, success: true, messages: [] };
      }

      return { user: null, success: true, messages: errors };
    } catch (err) {
      // Handle Error on a separate file
      if (err.code === 11000) {
        const fieldName = Object.keys(err.keyPattern)[0];
        return {
          user: null,
          success: true,
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
