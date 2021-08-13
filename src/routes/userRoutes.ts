import { Router } from "express";
import userController from "../controller/userController";

const userRouter = Router();

userRouter.post('/cadastro', userController.reg);
userRouter.get('/',userController.list);


export default userRouter;