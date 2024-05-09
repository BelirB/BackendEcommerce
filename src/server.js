import express from 'express';
import configMongo from './config/mongo.js';

import __dirname from './libraries/dirname.js';
import cors from 'cors';
import { addLogger, logger } from './libraries/middleware/logger.js';
import handleResponses from './libraries/middleware/handleResponses.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import appRouter from './config/routes.js'
import dotenv from 'dotenv';

dotenv.config()

const app = express();

const port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


configMongo.connectDB();

app.use(cors());
app.use(addLogger)
app.use(handleResponses)


initializePassport()
app.use(passport.initialize())


app.use(appRouter);


app.listen(port, (err) => {
  if (err) { logger.fatal("Error fatal en server: ", err); }
  logger.info(`Server andando en port ${port}`);
});

//INICIAR: npm run dev:npm