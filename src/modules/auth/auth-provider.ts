import { Injectable } from "graphql-modules";
import { UserType } from "../../models/user";
import logger from "../../utils/logger";

@Injectable({
    global: true,
})
export class AuthProvider {
    user: UserType;

    public getCurrentUser() {
        logger.debug(`Asking for authenticated user`);
        return this.user;
    }

    public setCurrentUser(user: UserType) {
        this.user = user;
    }

    public isAuthenticated() {
        return this.user != null;;
    }
}