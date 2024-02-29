import configObject from "./index.js";
import passport from "passport";
import jwt from "passport-jwt";
//import GithubStrategy from "passport-github2";
//import { UserClass } from "../daos/factory.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
//const userService = new UserClass();

const initializePassport = () => {
  // JWT
  /* const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies["token"];
    }
    return token;
  }; */

  passport.use("jwt", new JWTStrategy(
      {
        //jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: configObject.jwt_code,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload); // resultado token
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};

export default initializePassport;