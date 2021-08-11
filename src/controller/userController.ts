import { Request, Response } from "express";
import user_models from "../models/user_models";


class UserController {
    public async reg(req: Request, res: Response): Promise<Response> {
        const user = await user_models.create(req.body);
        return res.json(user);
    }
}

export default new UserController();