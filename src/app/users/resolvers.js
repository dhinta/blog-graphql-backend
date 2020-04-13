import Model from "./model.js";

const resolvers = {
  Query: {
    users: async () => {
      const data = await Model.all();
      return data;
    },
  },
  Mutation: {
    createUser: async (parent, arg) => {
      const data = await Model.save({
        ...arg.user,
      });
      return data;
    },
    authenticate: async (parent, email, password) => {
      const data = await Model.authenticate(email, password);
      return data;
    }
  }
};

export default resolvers;
