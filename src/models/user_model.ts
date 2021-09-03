import { Schema, model, Document  } from "mongoose";
import { UserInterface } from "../interfaces/userInterface";
import bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";
import 'dotenv/config';

interface UserModel extends  Document, UserInterface {}


const UserSchema = new Schema<UserModel>({
    
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    }
});

UserSchema.pre<UserModel>('save', async function criptPassword() {
    this.password = await bcrypt.hash(this.password, 8);
});
UserSchema.methods.comparePassword = function(password: string): Promise<boolean> {
   
    return bcrypt.compare(password, this.password);
}
UserSchema.methods.createToken = function() {
    const decodedToken = {
        _id: String(this._id),
        name: this.name
    }

    return jwt.sign(decodedToken, process.env.SECRET_JWT, { expiresIn: '1d' });
}

UserSchema.pre<UserModel>('save', async function generateAvatar() {
    const randomId = await Math.floor(Math.random() * (1000000)) + 1;
    this.avatar = `https://api.adorable.io/avatars/285/${randomId}.png`; 
});

export default model<UserModel>('User', UserSchema);