import mongoose from "mongoose";
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  topic: {
    type: String,
    required: [true, 'Topic is required']
  },
  details: {
    type: String,
    required: [true, 'Details is required']
  },
  date: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    required: [true, 'Who is the author']
  },
});

const commentSchema = new Schema({
  comment: {
    type: String,
    required: [true, 'Comment is missing']
  },
  blogId: {
    type: String,
    required: [true, 'blogId is missing']
  },
  date: {
    type: Date,
    default: Date.now
  },
  postedBy: {
    type: String,
    required: [true, 'Who is the commentor']
  },
});

mongoose.model("Blog", blogSchema);
mongoose.model("Comment", commentSchema);