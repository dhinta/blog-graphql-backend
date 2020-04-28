import Model from "./model.js";
import Util from '../../lib/util.js'

const resolvers = {
  Query: {
    blogs: async (parent, args, context) => {
      const data = args.createdBy ? await Model.all(args.createdBy) : await Model.all();
      return data;
    },
    userBlogs: Util.authenticated(async (parent, args, context) => {
      const data = await Model.all(context.currentUser.id);
      return data;
    }),
    blog: async (parent, args) => {
      const data = await Model.get(args.id);
      return data;
    },
  },
  Mutation: {
    createBlog: Util.authenticated(async (parent, arg, context) => {
      const input = {
        ...arg.blog,
        createdBy: context.currentUser.id
      }
      const data = await Model.save(input);
      return data;
    }),
    updateBlog: Util.authenticated(async (parent, args) => {
      const data = await Model.update(args.id, args.blog);
      return data;
    }),
    deleteBlog: Util.authenticated(async (parent, arg) => {
      const data = await Model.delete(arg.id);
      return data;
    }),
    createComment:  Util.authenticated(async (parent, arg, context) => {
      const input = {
        ...arg.comment,
        postedBy: context.currentUser.id
      };
      console.log(input);
      const data = await Model.postComment(input);
      return data;
    }),
  },
};

export default resolvers;
