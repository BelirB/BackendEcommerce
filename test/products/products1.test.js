import {connect} from 'mongoose';
import Assert from 'node:assert';
import ProductDaoMongo from '../../src/daos/mongo/products.daomongo.js';

const assert = Assert.strict
connect("mongodb+srv://...");

describe('Test de product.daomongo', () => {
  
  before(function () {
    this.dao = new ProductDaoMongo
  })
  
  beforeEach(function () {
    this.timeout(3000)
  })
  it("Nuestro dao debe obtener un array de Productss", async function () {
    const resp = await this.dao.get()
    assert.strictEqual(Array.isArray(resp), true)
  })
  it("Nuestro dao debe obtener mas de un producto", async function () {
    const resp = await this.dao.get()
    assert.strictEqual(resp.length>0, true)
  })
}) 