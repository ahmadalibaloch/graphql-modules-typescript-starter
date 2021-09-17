import { Injectable } from "graphql-modules";
import { AuthProvider } from "../auth/auth-provider";
import { NIL as NIL_UUID } from "uuid";
import { User, UserType } from "../../models/user";
import logger from "../../utils/logger";

const usersArray: UserType[] = [];

@Injectable({
    global: true,
})
export class UserProvider {
    constructor(private authProvider: AuthProvider) { }
    public async allUsers(): Promise<UserType[]> {
        try {
            const users: UserType[] = usersArray;
            return users;
        } catch (error) {
            logger.error(error.message);
            throw error.message;
        }
    }
    public async getUser(id: string): Promise<UserType> {
        try {
            return usersArray.find((u) => u.id === id);
        } catch (error) {
            logger.error(error.message);
            throw error.message;
        }
    }
    public async createUser({ input }): Promise<UserType> {
        try {
            const { email, password, name, phone } = input;
            const user = new User();
            user.email = email;
            user.name = name;
            user.id = NIL_UUID;
            user.password = User.hashPassword(password);
            user.phone = phone ?? "";
            user.createdAt = new Date();
            user.role = "user";
            usersArray.push(user);
            return Promise.resolve(user.toJSON() as UserType);
        } catch (error) {
            logger.error(error.message);
            throw error.message;
        }
    }
    public async loginUser({ input }): Promise<UserType> {
        try {
            const { email, password } = input;
            logger.info(email);
            if (!email && !password) {
                const message = {
                    message: "User not found",
                    name: "UserNotFound"
                };
                throw message;
            } else {
                const user = usersArray.find((u) => u.email === email);
                if (!user) {
                    throw {
                        message: "User not found",
                        name: "Unauthorized"
                    }
                }
                const authenticatedUser = user.authenticateUser(password);
                if (authenticatedUser) {
                    const currentUser = user.toJSON();
                    this.authProvider.setCurrentUser(currentUser);
                    return currentUser;
                } else {
                    const message = {
                        message: "Unauthorized access",
                        name: "Unauthorized"
                    };
                    throw message;
                }
            }

        } catch (error) {
            logger.error(error.toString());
            throw error.message;
        }
    }
}
