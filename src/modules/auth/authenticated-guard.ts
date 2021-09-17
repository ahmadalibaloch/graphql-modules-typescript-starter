import logger from "../../utils/logger";
import { AuthProvider } from "./auth-provider";
import { verifyUserToken } from "./helpers";

export async function authenticated({ root, args, context, info }, next) {
  const authHeader =  context.request.headers.authorization;
  let currentUser = null;
  try {
    if (authHeader) {
      currentUser = await verifyUserToken(authHeader);
    }
  } catch (error) {
    logger.error(error.message);
  }
  if (currentUser == null) {
    throw new Error('Login required!');
  }
  const authProvider = await context.injector.get(AuthProvider);
  authProvider.setCurrentUser(currentUser);
  return next();
}

