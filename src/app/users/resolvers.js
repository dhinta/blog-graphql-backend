import Model from "./model.js";
import Util from '../../lib/util.js'

const resolvers = {
  Query: {
    // users: async () => {
    //   const data = await Model.all();
    //   return data;
    // },
    user: Util.authenticated(async (parent, arg) => {
      const data = await Model.get(arg.id);
      return data;
    }),
    getLoggedInUserInfo: Util.authenticated(async (parent, arg, context) => {
      const data = await Model.get(context.currentUser.id);
      return data;
    })
  },
  Mutation: {
    createUser: async (parent, arg) => {
      const data = await Model.save({
        ...arg.user,
      });
      return data;
    },
    authenticate: async (parent, args) => {
      const data = await Model.authenticate(args.email, args.password);
      return data;
    }
  }
};

export default resolvers;
