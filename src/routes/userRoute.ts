import { Router } from "express";
import userController from "../controller/userController";
import AuthMiddleware from "../middlewares/auth.middleware";
const userRouter = Router();

userRouter.post('/cadastro', userController.reg);
userRouter.get(
    '/',
    AuthMiddleware.authorizationByToken,
    userController.list
);
userRouter.post('/autenticate',userController.autenticate);
userRouter.get(
    '/:id',
    AuthMiddleware.authorizationByParamId,
    AuthMiddleware.authorizationByToken,
    userController.getById
);

export default userRouter;