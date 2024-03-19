import passport from "passport";
import UsersController from "../controller/users.controller.js";

const uControl = new UsersController();

// ? AUTH JWT BEARER - PASSPORT

export const handleAuth = (policies) => {
  // Policies => ['PUBLIC', 'USER', 'USER_PREMIUM', 'ADMIN']
  return async (req, res, next) => {
    try {
      passport.authenticate('jwt', {session: false}, async function (err, user, info) {
        if (err) next(err)
        if (user) {
          req.user = await uControl.getDataUserById(user.id)
        }
        if(policies[0] === 'PUBLIC') return next();

        if (!user) return res.sendUserError('Invalid token')

        if(user.role.toUpperCase() === 'ADMIN') return next();
        if(!policies.includes(user.role.toUpperCase())) return res.sendUserError('User not authorized')
        next();
      })(req, res, next);      
    } catch (error) {
      next(error)
    }
  };
};
