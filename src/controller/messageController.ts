import message_model from "../models/message_model";
import { Request, Response } from "express";

class MessageController {

    public async send(req: Request, res: Response): Promise<Response> {
        try{ 
            const message = await message_model.create({
                text: req.body.text,
                sender: req.user._id,
                recipient: req.userChat._id,
            });
            return res.json(message);
        }catch(e) {
            console.log(e)
        }
    }
    public async list(req: Request, res: Response): Promise<Response> {
        try{
            const idUserLoged = req.user._id; 
            const idUserChat = req.userChat._id; 
            const messages = await message_model.searchMessagesChat(idUserLoged, idUserChat)
            .sort('createdAt');

            const messageChat = messages.map(message => {
                return {
                    text: message.text,
                    createdAt: message.createdAt,
                    isSender: message.sender == String(idUserLoged)
                }
            })
            return res.json(messageChat);
            
          
        }catch(e) {
            console.log(e)
        }
    }
    
}

export default new MessageController();