export interface UserInterface {
    _id: any | string,
    name?: string,
    password?: string,
    avatar: string
}

export interface MessageUserInterface extends UserInterface {
    lastMessage: string;
    dateLastMessage: string;
}