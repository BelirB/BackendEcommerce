import { Router } from "express";
import viewsRouter from './views.route.js'
import { productsRoute, sessionsRoute  } from "./api/index.js";
import UsersCRouter from "./api/usersClass.router.js";

const router = Router()
const usersRouter = new UsersCRouter();

// definiendo vistas
router.use('/', viewsRouter);

// definiendo las API
router.use('/api/products/', productsRoute);
router.use('/api/carts/', ()=>{});

router.use('/api/sessions/', sessionsRoute);
router.delete('/api/messages', ()=>{});

router.use('/api/users/', usersRouter.getRouter());

export default router;