import Model from './model.js';

const resolvers = {
  Query: {
    users: async () => {
        const data = await Model.all();
        return data;
    },
  },
  Mutation: {
    createUser: async (parent, arg) => {
        console.log({
            ...arg.user
        });
        const data = await Model.save({
            ...arg.user
        });
        return data;
    }
  }
};

export default resolvers;
