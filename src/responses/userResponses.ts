import { UserResponseInterface } from "../interfaces/userResponseInterface";


export class UserResponses implements UserResponseInterface {
    _id: any | string;
    name?: string;
    password?: string;
    avatar: string;
    flag: string;
    message: string;
    
    public responsePostUsers(user: UserResponseInterface) {
        let userResponse =  {
            message: "Usuário criado com sucesso!!",
            _id: user._id,
            name: user.name,
            password: user.password,            
            avatar: user.avatar
        };

        if(user.flag) {
           userResponse.message = "Usuário não pôde sercriado com sucesso!!";
        }

        return userResponse;
    }
}
export default new UserResponses();