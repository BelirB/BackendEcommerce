import DaoMongo from "../../../libraries/custom/dao.mongo.js";
import cartModel from "./carts.model.js";

export default class CartDaoMongo  extends DaoMongo{
  constructor() {
    super (cartModel);
  }

  getPopulate = async (filter = {}) => await this.model.find(filter).populate('products.product');

  getByPopulate = async (filter) => await this.model.findOne(filter).populate('products.product');

  edithProductQuantity = async (cid, pId, quantity) => {
    const filter = { _id: cid, "products.product": pId };
    let update

    if (quantity === 0) {
      
      update = { 
        $pull: { products: { product: pId } },
        $set: { lastupdated: new Date() } 
      };
    } else {
      
      update = {
        $inc: { "products.$.quantity": quantity },
        $set: { lastupdated: new Date() }
      };
    }
    

    const result = await this.model.findOneAndUpdate(filter, update, { new: true });
    
    if (!result && quantity > 0) {
      
      const newProduct = { product: pId, quantity };
      return await this.model.findOneAndUpdate(
        { _id: cid },
        { $push: { products: newProduct },
          $set: { lastupdated: new Date() } },
        { new: true });
    } else {
      return result
    }
  }
 
  updateProductQuantity = async (cid, pId, quantity) => {
    return await this.model.findByIdAndUpdate(
      { _id: cid, "products.product": pId },
      { $set: { "products.$.quantity": quantity ,
                lastupdated: new Date()} },
      { new: true }
    );
  }

  updateCartProducts = async (cid, newProducts) => {
    return await this.model.findByIdAndUpdate(
      { _id: cid },
      { $set: { products: newProducts,
        lastupdated: new Date() } },
      { new: true }
    );
  }
  
}