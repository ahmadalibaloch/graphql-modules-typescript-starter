import { createModule } from "graphql-modules";
import { authenticated } from "../auth/authenticated-guard";
import { UserProvider } from "./providers";
import resolvers from "./resolvers";
import * as typeDefs from "./schema.graphql";

const UserModule = createModule({
  id: 'UserModule',
  dirname: __dirname,
  typeDefs,
  resolvers,
  providers: [UserProvider],
  middlewares: {
    'Query': {
      '*': [authenticated]
    }
  },
});

export default UserModule;

