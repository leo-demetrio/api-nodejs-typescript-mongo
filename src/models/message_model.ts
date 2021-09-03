import { Schema, model, Model, DocumentQuery  } from "mongoose";
import { MessageInterface } from "../interfaces/messagesInterface";

interface MessageModel extends MessageInterface, Document {}
interface MessageStatic extends Model<MessageModel> {
    searchMessagesChat(idUserLoged: string, idUserChat: string): DocumentQuery<MessageModel[], any>;
}

const MessageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

MessageSchema.statics.searchMessagesChat = function(idUserLoged: string, idUserChat: string): DocumentQuery<MessageModel[], MessageModel> {
    return this.find({
        $or: [
            { $and: [{sender: idUserLoged}, { recipient: idUserChat }]},
            { $and: [{sender: idUserChat}, { recipient: idUserLoged }]}
        ]
    })
}

export default model<MessageModel, MessageStatic>('Message', MessageSchema);