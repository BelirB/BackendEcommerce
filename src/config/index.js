import dotenv from 'dotenv';
import program from './commander.js';

const opts = program.opts();

dotenv.config({
  path: opts.mode == 'production' ? './.env.production' : './.env.development'
})

import {connect} from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { logger } from '../utils/logger.js';
// opts.mode = 'production' inicia prod.port 4000

const configObject = {
  //conexion Mongo Atlas a traves de mongoose
  port: process.env.PORT,
  jwt_code: process.env.JWT_SECRET_CODE,
  cookies_code: process.env.COOKIES_SECRET_CODE,
  mongo_uri: process.env.MONGO_URI,
  uadmins: process.env.USERS_ADMIN,
  uadmin_pass: process.env.USER_ADMIN_PASS,
  gh_client_id: process.env.GITHUB_CLIENT_ID,
  gh_client_secret: process.env.GITHUB_CLIENT_SECRET,
  gmail_user_app: process.env.GMAIL_USER_APP,
  gmail_pass_app: process.env.GMAIL_PASS_APP,
  development: opts.mode == 'development',

  connectDB: async () => {

    MongoSingleton.getInstance();
  },

  //conexion Mongo Atlas session
  sessionAtlas: (app) => {
    app.use(
      session({
        store: MongoStore.create({
          mongoUrl: process.env.MONGO_URI,
          mongoOptions: {
    
          },
          ttl: 3600,
        }),
        secret: process.env.COOKIES_SECRET_CODE,
        resave: true,
        saveUninitialized: true,
      })
    );
  },
}

class MongoSingleton {
  static instance //
  constructor() {
    connect(process.env.MONGO_URI);
  }

  static getInstance() {
    if(!this.instance){
      logger.info('Conectado a Base de Datos');
      return this.instance = new MongoSingleton();
    }
    logger.info('La Base de datos esta conectada');
    return this.instance;
  }
}

export default configObject


