import { Router } from "express";
import { handleAuth } from "../middleware/handlePoliciesPASP.js";
export default class CustomRouterAuth {
  constructor(controller) {
    this.router = Router();
    this.controller = controller;
    this.init();
  }
  init() {
    this.get    ('/',       ['PUBLIC'], this.controller.gets)
    this.get    ('/:eid',   ['PUBLIC'], this.controller.getId)
    this.post   ('/',       ['ADMIN'] , this.controller.create)
    this.put    ('/:eid',   ['ADMIN'] , this.controller.updateId)
    this.delete ('/:eid',   ['ADMIN'] , this.controller.deleteId)
  } 
  getRouter() { return this.router; } 

  get   (path, auth, ...callbacksA) { this.router.get   (path, handleAuth(auth), this.applyCallbacks(callbacksA)); }
  post  (path, auth, ...callbacksA) { this.router.post  (path, handleAuth(auth), this.applyCallbacks(callbacksA)); }
  put   (path, auth, ...callbacksA) { this.router.put   (path, handleAuth(auth), this.applyCallbacks(callbacksA)); }
  delete(path, auth, ...callbacksA) { this.router.delete(path, handleAuth(auth), this.applyCallbacks(callbacksA)); }

  
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
