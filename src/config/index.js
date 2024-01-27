import 'dotenv/config';

//conexion Mongo Atlas a traves de mongoose
//-------------------------------------------------------------------
import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose.connect(
    // `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ktawedp.mongodb.net/ecommerce?retryWrites=true&w=majority`,
    `${process.env.MONGO_URL}`,
  );
  console.log('Base de datos conectada');
};

//conexion Mongo Atlas session
//-------------------------------------------------------------------
import session from 'express-session';
import MongoStore from 'connect-mongo';

export const sessionAtlas = (app) => {
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl:`${process.env.MONGO_URL}`,
        mongoOptions: {
          
        },
        ttl: 3600, // milisegundos --> hs
      }),
      secret: process.env.SECRET_CODE,
      resave: true,
      saveUninitialized: true,
    })
  );
};