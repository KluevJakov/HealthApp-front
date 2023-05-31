import { Message } from "./message";
import { User } from "./user";

export class Chat {
    id!: number;
    members!: Array<User>;
    messages!: Array<Message>;

    constructor(chat: any) {
        this.id = chat.id;
        this.members = chat.members;
        this.messages = chat.messages;
    }
}