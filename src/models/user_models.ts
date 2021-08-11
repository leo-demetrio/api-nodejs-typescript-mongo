import { Schema, model  } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    }
});

export default model('User', UserSchema);