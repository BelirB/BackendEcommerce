import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  products: {     type: [{
      product:  { type: Schema.Types.ObjectId, ref: 'products' },
      quantity: { type: Number, default: 1 }
    }]},
  atCreated:    { type: Date, default: Date() },
  lastupdated:  { type: Date, default: Date()}
});


export default model('carts', cartSchema)
