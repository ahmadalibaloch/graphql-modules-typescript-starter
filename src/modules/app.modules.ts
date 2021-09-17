import { createApplication } from "graphql-modules";
import { AuthModule } from "./auth";
import UserModule from "./user";

const AppModule = createApplication({
  modules: [
    AuthModule,
    UserModule,
  ],
});

export default AppModule;
