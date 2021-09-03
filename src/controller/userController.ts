import { Request, Response } from "express";
import UserRepository from "../repositories/userRepository";
import UserResponses from "../responses/userResponses";


class UserController {
    public async reg(req: Request, res: Response): Promise<Response> {
        try{
            const user =  await UserRepository.createUser(req.body);
            return res.json(UserResponses.responsePostUsers(user));
        }catch (e) {
            console.log("Erro na controller", e);
            return res.json(UserResponses.responsePostUsers(req.body))
        }
    }
    public async list(req: Request, res: Response): Promise<Response> {
        try{
            const user = await UserRepository.listAll();
            return res.json(user);
        }catch(e){
            console.log("Erro" + e)
            return res.json(UserResponses.responsePostUsers(req.body))
        }
    }
    public async autenticate(req: Request, res: Response): Promise<Response> {
        try{
            const user = await UserRepository.autenticateUser(req.body);
            return res.json(user);
        }catch(e){
            console.log("Erro" + e)
            return res.json(UserResponses.responsePostUsers(req.body));
        }
    }
}

export default new UserController();