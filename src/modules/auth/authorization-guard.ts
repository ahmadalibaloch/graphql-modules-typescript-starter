import { AuthProvider } from "./auth-provider";

export const validateRules = (role) => (next) => async (root, args, context, info) => {
  const authProvider = await context.injector.get(AuthProvider);
  if (authProvider.getCurrentUser().role !== role ) {
      throw new Error(`Unauthorized!`);
  }
  return next(root, args, context, info);
};
