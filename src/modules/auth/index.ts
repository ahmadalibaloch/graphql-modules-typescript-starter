import resolvers from "./resolvers";
import * as typeDefs from "./schema.graphql";

import {
  createModule,
} from 'graphql-modules';
import { authenticated } from "./authenticated-guard";
import { AuthProvider } from "./auth-provider";

export const AuthModule = createModule({
  id: 'AuthModule',
  dirname: __dirname,
  typeDefs,
  resolvers,
  providers: [AuthProvider],
  middlewares: {
    'Query': {
      'me': [authenticated]
    }
  },
});

