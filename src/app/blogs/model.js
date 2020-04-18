import mongoose from "mongoose";
import * as Schema from "./schema.js";
import validationHandler from "../../lib/validation.js";

const BlogModel = mongoose.model("Blog");

const Model = {
  async all() {
    try {
      const blogs = await BlogModel.find({});

      return { blogs: blogs, success: true, errors: [] };
    } catch (e) {
      console.log(e);
      return {
        blogs: null,
        success: false,
        errors: [
          {
            type: "ERROR",
            message: e.message,
          },
        ],
      };
    }
  },
  async get(id = null) {
    if (id) {
      try {
        const blog = await BlogModel.findById(id);
        return { blog: blog, success: true, errors: [] };
      } catch (e) {
        console.log(e);
        return {
          blog: null,
          success: false,
          errors: [
            {
              type: "ERROR",
              message: e.message,
            },
          ],
        };
      }
    }
  },
  async save(data = null) {
    try {
      const blogDoc = new BlogModel({ ...data });
      const errors = validationHandler.handleValidationErrors(
        blogDoc.validateSync()
      );
      if (!errors) {
        const retVal = await blogDoc.save();
        return { blog: retVal, success: true, errors: [] };
      }
      return { blog: null, success: false, errors: errors };
    } catch (err) {
      // Handle Error on a separate file
      console.log(err);
      return {
        blog: null,
        success: false,
        errors: [
          {
            type: "ERROR",
            message: err.message,
          },
        ],
      };
    }
  },
  async update(id, data) {
    try {
      const blog = await BlogModel.findOneAndUpdate(
        {
          _id: id,
        },
        data,
        {
          new: true,
        }
      );
      return {
        blog: blog,
        success: true,
        errors: [],
      };
    } catch (err) {
      return {
        blog: null,
        success: false,
        errors: [
          {
            type: "ERROR",
            message: err.message,
          },
        ],
      };
    }
  },
  async delete(id) {
    try {
      const blog = await BlogModel.deleteOne({
        _id: id,
      });
      return {
        blog: blog,
        success: true,
        errors: [
          {
            type: "SUCCESS",
            message: "Successfully Deleted",
          },
        ],
      };
    } catch (err) {
      console.log(err);
      return {
        blog: null,
        success: false,
        errors: [
          {
            type: "ERROR",
            message: err.message,
          },
        ],
      };
    }
  },
};

export default Model;
