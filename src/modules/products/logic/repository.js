import CustomRepositoryLU from "../../../libraries/custom/repository.lastupdated.js";
import validateFields from "../../../libraries/validatefiels.js";

class ProductRepository extends CustomRepositoryLU {
  constructor(dao) {
    super(dao);
  }

  getPaginate  = async (query) => {
    const filter = {}


    if (query.category && await this.checkCategory(query.category)) {
      filter.category = query.category;
      delete query.category;
    }

    if (query.availability) {
      Object.assign(filter, this.convertAvailability(query.availability)); 
      delete query.availability;
    }

   
    const options = {
      limit: parseInt(query.limit) || 10,
      page: parseInt(query.page) || 1,
      sort: this.convertSort(query.sort, "price"),
    };
    delete query.limit;
    delete query.page;
    delete query.sort;

    
    for (const key in query) {
      filter[key] = query[key];
    }

    
    const resp = await this.dao.getPaginate(filter, options)

    const { prevPage, nextPage } = resp;
    const prevLink = prevPage ? `&page=${prevPage}` : "";
    const nextLink = nextPage ? `&page=${nextPage}` : "";

    return {
      ...resp,
      prevLink: prevLink,
      nextLink: nextLink,
    };
  }

  getCategorys = async () =>  await this.dao.getCategorys()

  create       = async (newElement) => {
    const requiredFields = [
      "title",
      "description",
      "code",
      "price",
      "stock",
      "status",
      "category",
      "thumbnail",
      "owner",
    ];
    const newProduct = validateFields(newElement, requiredFields);
    return await this.dao.create (newProduct)
  }

 
  convertSort = (option, element) => {
    const sortOptions = {
      "1": 1,
      "-1": -1,
      asc: "asc",
      desc: "desc",
    };
    if(!option) return {}
    const objectReturn = {}
    objectReturn[element] = sortOptions[option];
    return objectReturn;
  } 

  convertAvailability = (availability) => {
    if (availability == "true") return { stock: { $gt: 0 } }
  } 

  checkCategory = async (category) => {
    const categories = await this.dao.getCategorys();
    return categories.includes(category);
  } 
}

import ProductDaoMongo from "../data/dao.mongo.js";
export const productsService = new ProductRepository  (new ProductDaoMongo())
export default productsService