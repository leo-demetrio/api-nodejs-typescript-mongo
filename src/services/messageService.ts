import { MessageInterface } from "../interfaces/messagesInterface";
import { MessageUserInterface, UserInterface } from "../interfaces/userInterface";

class MessageService {

    public getResultMessageUser(messages: MessageInterface, user: UserInterface): MessageUserInterface {
        return {
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
            lastMessage:  messages[0]?.text || null,
            dateLastMessage:  messages[0]?.createdAt || null        
        }
    }
    public returnMessagesOrdered(usersMessages: MessageUserInterface[]): MessageUserInterface[] {
        return usersMessages.sort((a,b) => {
            return (a.dateLastMessage ? 0 : 1) - (b.dateLastMessage ? 0 : 1)
                || -(a.dateLastMessage > b.dateLastMessage)
                || +(a.dateLastMessage < b.dateLastMessage)
        });
    }
}

export default new MessageService();