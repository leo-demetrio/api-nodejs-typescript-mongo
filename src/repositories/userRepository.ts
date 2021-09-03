import user_models from "../models/user_model";
import bcrypt from "bcrypt";



class UserRepository {
    private userModel: any;
    private secretJwt: any = process.env.SECRET_JWT;

    constructor(user_models) {
        this.userModel = new user_models();

    }
    public async createUser(body) {
        try{
            const user = await user_models.create(body);
            return user;
        }catch(e){
            console.log("Erro na classe UserRepositoy" + e)
            body.flag = true;
            return body;
        }
     
    }
    public async listAll() {
        try{
            const allUser = await this.userModel.find();
            return allUser;
        }catch(e){
            console.log(e)
        }
     
    }
    public async autenticateUser(body: any) {
        const { name, password } = body;
        
        try{     
            const user = await user_models.findOne({ name });
            if(!user) return false;                      
            const passwordUser = await user.comparePassword(password);           
            if(!passwordUser) return false;
            const token = user.createToken();           
            return {
                token, user
            } ;
        }catch(e){
            console.log(e)
            return false;
        }
     
    }
}

export default new UserRepository(user_models);