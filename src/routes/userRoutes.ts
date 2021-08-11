import { Router } from "express";
import userController from "../controller/userController";

const userRouter = Router();

userRouter.post('/cadastro', userController.reg);


export default userRouter;