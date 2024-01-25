require('dotenv').config();

//conexion Mongo Atlas a traves de mongoose
//-------------------------------------------------------------------
const mongoose = require('mongoose');

exports.connectDB = async () => {
  await mongoose.connect(
    // `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ktawedp.mongodb.net/ecommerce?retryWrites=true&w=majority`,
    `${process.env.MONGO_URL}`,
  );
  console.log('Base de datos conectada');
};

//conexion Mongo Atlas session
//-------------------------------------------------------------------
const session = require('express-session');
const MongoStore = require('connect-mongo');

exports.sessionAtlas = (app) => {
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl:`${process.env.MONGO_URL}`,
        mongoOptions: {
          
        },
        ttl: 3600, // milisegundos --> hs
      }),
      secret:"secreto",
      resave: true,
      saveUninitialized: true,
    })
  );
};