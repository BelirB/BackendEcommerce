import configObject from "../envs.js";
import jwt from "jsonwebtoken";

const JWT_PRIVATE_KEY = configObject.jwt_code;

const createToken = (user) => jwt.sign(user, JWT_PRIVATE_KEY, { expiresIn: "1d" });

export default createToken;