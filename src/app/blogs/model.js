import mongoose from "mongoose";
import * as Schema from "./schema.js";
import validationHandler from "../../lib/validation.js";

const BlogModel = mongoose.model("Blog");
const CommentModel = mongoose.model("Comment");

const Model = {
  async all(createdBy = null) {
    try {
      let blogs = createdBy
        ? await BlogModel.find({ createdBy: createdBy }).sort("-date")
        : await BlogModel.find({}).sort("-date");

      for (let count = 0; count < blogs.length; count++) {
        let comments = await this.getComments(blogs[count].id);
        blogs[count] = {
          _id: blogs[count]._id,
          topic: blogs[count].topic,
          details: blogs[count].details,
          date: blogs[count].date,
          createdBy: blogs[count].createdBy,
          comments: comments,
        };
      }

      return { blogs: blogs, success: true, errors: [] };
    } catch (e) {
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
        blog.comments = await this.getComments(blog._id);
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
  async postComment(data = null) {
    try {
      const commentDoc = new CommentModel({ ...data });
      const errors = validationHandler.handleValidationErrors(
        commentDoc.validateSync()
      );
      if (!errors) {
        const retVal = await commentDoc.save();
        return { success: true, errors: [] };
      }
      return { blog: null, success: false, errors: errors };
    } catch (err) {
      // Handle Error on a separate file
      console.log(err);
      return {
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
  async getComments(blogId = null) {
    if (blogId) {
      try {
        const comments = await CommentModel.find({
          blogId,
        }).sort("-date");
        console.log(comments);
        return comments;
        // return { comments: comments, success: true, errors: [] };
      } catch (e) {
        console.log(e);
        return {
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
};

export default Model;
