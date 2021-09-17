import * as jwt from "jsonwebtoken";
import { UserType } from "../../models/user";

export async function verifyUserToken(token): Promise<UserType> {
  try {
    const user = await jwt.verify(token, process.env.JWT_SECRET) as UserType;
    return user;
  } catch (error) {
    throw error.message;
  }
}
