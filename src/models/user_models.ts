import { Schema, model, Document  } from "mongoose";
import { UserInterface } from "../interfaces/userInterface";
import bcrypt from 'bcrypt';

interface UserModel extends UserInterface, Document {}

const UserSchema = new Schema({
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

UserSchema.pre<UserModel>('save', async function generateAvatar() {
    const randomId = await Math.floor(Math.random() * (1000000)) + 1;
    this.avatar = `https://api.adorable.io/avatars/285/${randomId}.png`; 
});

export default model<UserModel>('User', UserSchema);