import { Request, Response } from "express";
import userRepository from "../repositories/userRepository";
import userResponse from "../responses/userResponses";


class UserController {
    public async reg(req: Request, res: Response): Promise<Response> {
        try{
            const user =  await userRepository.createUser(req.body);
            return res.json(userResponse.responsePostUsers(user));
        }catch (e) {
            console.log("Erro na controller", e);
            return res.json(userResponse.responsePostNotCreated(req.body))
        }
    }
    public async list(req: Request, res: Response): Promise<Response> {
        try{
            const user = await userRepository.listAll();
            return res.json(user);
        }catch(e){
            console.log("Erro" + e)
        }
    }
}

export default new UserController();