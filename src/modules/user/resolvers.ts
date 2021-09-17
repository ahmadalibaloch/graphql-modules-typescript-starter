import { UserProvider } from "./providers";

export default {
  Query: {
    users: (_root, _args, { injector }) => injector.get(UserProvider).allUsers() ,
    user: (_root, { id }, { injector }) => injector.get(UserProvider).getUser(id)
  },
  User: {
    id: (user) => user.id,
    email: (user) => user.email,
    name: (user) => user.name
  }
};
