import { Router } from "express";
import MessageController from "../controller/messageController";
import AuthMiddleware from "../middlewares/auth.middleware";
const messageRouter = Router();


messageRouter.post(
    '/:id',
    AuthMiddleware.authorizationByParamId,
    AuthMiddleware.authorizationByToken, 
    MessageController.send
);
messageRouter.get(
    '/:id',
    AuthMiddleware.authorizationByParamId,
    AuthMiddleware.authorizationByToken, 
    MessageController.list
);

export default messageRouter;