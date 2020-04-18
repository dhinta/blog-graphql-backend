import Model from "./model.js";
import Util from '../../lib/util.js'

const resolvers = {
  Query: {
    blogs: async (parent, args, context) => {
      
      console.log(context)
      const data = await Model.all();
      return data;
    },
    blog: async (parent, args) => {
      const data = await Model.get(args.id);
      return data;
    },
  },
  Mutation: {
    createBlog: Util.authenticated(async (parent, arg) => {
      const data = await Model.save({
        ...arg.blog,
      });
      return data;
    }),
    updateBlog: Util.authenticated(async (parent, args) => {
      const data = await Model.update(args.id, args.blog);
      return data;
    }),
    deleteBlog: Util.authenticated(async (parent, arg) => {
      const data = await Model.delete(arg.id);
      return data;
    })
  },
};

export default resolvers;
