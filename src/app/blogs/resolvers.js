import Model from "./model.js";

const resolvers = {
  Query: {
    blogs: async () => {
      const data = await Model.all();
      return data;
    },
    blog: async (parent, args) => {
      const data = await Model.get(args.id);
      return data;
    },
  },
  Mutation: {
    createBlog: async (parent, arg) => {
      const data = await Model.save({
        ...arg.blog,
      });
      return data;
    },
    updateBlog: async (parent, args) => {
      const data = await Model.update(args.id, args.blog);
      return data;
    },
    deleteBlog: async (parent, arg) => {
      const data = await Model.delete(arg.id);
      return data;
    }
  },
};

export default resolvers;
