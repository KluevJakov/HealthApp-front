import { User } from "./user";

export class Message {
    id!: number;
    sender!: User;
    text!: string;
    date!: Date;

    constructor(message: any) {
        this.id = message.id;
        this.sender = message.sender;
        this.text = message.text;
        this.date = message.date;
    }
}