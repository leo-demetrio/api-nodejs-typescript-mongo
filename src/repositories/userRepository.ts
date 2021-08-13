import user_models from "../models/user_models";

class UserRepository {
    private userModel;

    constructor(user_models) {
        this.userModel = user_models;
    }
    public async createUser(body) {
        try{
            const user = await this.userModel.create(body);
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
}

export default new UserRepository(user_models);