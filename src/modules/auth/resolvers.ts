import { UserProvider } from "../user/providers";
import { AuthProvider } from "./auth-provider";

export default {
  Query: {
    async me(_root: {}, _args: {}, context: GraphQLModules.Context) {
      const authProvider = await context.injector.get(AuthProvider);
      const userProvider = await context.injector.get(UserProvider);
      return (await userProvider.allUsers()).find(f => f.email === authProvider.getCurrentUser().email);
    },
    async logout(_root: {}, _args: {}, { injector }) { await injector.get(AuthProvider).setCurrentUser(null); return 'Logged out'; },
  },
  Mutation: {
    register: (_root, { input }, { injector }) => injector.get(UserProvider).createUser({ input }),
    login: (_root, { input }, { injector }) => injector.get(UserProvider).loginUser({ input }),
  },
};
