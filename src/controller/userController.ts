import { Request, Response } from "express";
import message_model from "../models/message_model";
import user_model from "../models/user_model";
import UserRepository from "../repositories/userRepository";
import UserResponses from "../responses/userResponses";
import messageService from "../services/messageService";


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
            const userLoged = req.user._id;
            const users = await user_model.find({  _id: { $ne: userLoged}})
                        
            const usersMessages = await Promise.all(users.map((user) => {
                return message_model.searchMessagesChat(userLoged,user._id)
                    .sort('-createdAt')
                    .limit(1)
                    .map(messages => messageService.getResultMessageUser(messages, user));
                 })
            );

            const messageOrdered = messageService.returnMessagesOrdered(usersMessages);
            return res.json(messageOrdered);

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
    public getById(req: Request, res: Response) {
        return res.json(req.userChat);
    }

}

export default new UserController();

 