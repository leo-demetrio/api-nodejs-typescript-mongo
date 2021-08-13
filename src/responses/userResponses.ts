

export class UserResponses {
    public static responsePostUsers(user) {
        if(user.flag) {
           this.responsePostNotCreated(user);
        }
        return  [{
            message: "Usuário criado com sucesso!!",
            _id: user._id,
            name: user.name,
            password: user.password,            
            avatar: user.avatar
        }];
    }
    public static responsePostNotCreated(user) {
        return  [{
            message: "Usuário não pôde sercriado com sucesso!!",
            _id: user._id,
            name: user.name,
            password: user.password,
            avatar: user.avatar
        }];
    }
}
export default UserResponses;