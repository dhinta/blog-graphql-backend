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

mongoose.model("Blog", blogSchema);