import { Router } from "express";
import { handleAuth } from "../middleware/handlePoliciesPASP.js";
export default class CustomRouter {
  constructor(controller) {
    this.router = Router(); 
    this.controller = controller;
    this.init();
  }
  init() {
    this.get    ('/',       handleAuth(['PUBLIC']), this.controller.gets)
    this.get    ('/:eid',   handleAuth(['PUBLIC']), this.controller.getId)
    this.post   ('/',       handleAuth(['ADMIN']) , this.controller.create)
    this.put    ('/:eid',   handleAuth(['ADMIN']) , this.controller.updateId)
    this.delete ('/:eid',   handleAuth(['ADMIN']) , this.controller.deleteId)
  } 
  getRouter() { return this.router; } 

  get   (path, ...callbacksA) { this.router.get   (path, this.applyCallbacks(callbacksA)); }
  post  (path, ...callbacksA) { this.router.post  (path, this.applyCallbacks(callbacksA)); }
  put   (path, ...callbacksA) { this.router.put   (path, this.applyCallbacks(callbacksA)); }
  delete(path, ...callbacksA) { this.router.delete(path, this.applyCallbacks(callbacksA)); }

  
  applyCallbacks(callbacksArray) {
    
    return callbacksArray.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        params[1].status(500).send(error);
      }
    });
  }
}
