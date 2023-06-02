import { Message } from "./message";
import { User } from "./user";

export class MessageToChat {
    message!: Message;
    chatId!: number;

    constructor(message: any) {
        this.message = message.message;
        this.chatId = message.chatId;
    }
}