import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import user_model from "../models/user_model";
import { UserInterface } from "../interfaces/userInterface";

class AuthMiddleware {
    public async authorizationByToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const token = req.query.token || req.headers['x-access-token'];
        
        if (!token) return res.status(401).send({message: "Not authorization"});
        
        try {
            const userToken = jwt.verify(String(token), process.env.SECRET_JWT) as UserInterface;
            
            const user = await user_model.findById(userToken._id);
           
        if (!user) return res.status(401).send({message: "Not authorization"});
            
        req.user = user;

        return next();

        }catch (e) {
            console.log(e);
            return res.status(401).send({message: "Not authorization"});

        }

        
    }
    public async authorizationByParamId(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        
        try {  
                      
            const user = await user_model.findById(req.params.id);
            
           
        if (!user) return res.status(401).send({message: "Not authorization"});
            
        req.userChat = user;

        return next();

        }catch (e) {
            console.log(e);
            return res.status(401).send({message: "Not authorization"});

        }

        
    }
}

export default new AuthMiddleware();