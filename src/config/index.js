const mongoose = require('mongoose')

exports.connectDB = async () => {
  await mongoose.connect("mongodb+srv://bruno99:brunoblasco99@cluster0.ktawedp.mongodb.net/ecommerce?retryWrites=true&w=majority")
  console.log('Base de datos conectada')
}