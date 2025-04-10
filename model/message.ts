import { model, models, Schema } from "mongoose";

interface IMessage extends Document {
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema({
    senderId: { type: String, required: true, ref : 'User'},
    receiverId: { type: String, required: true , ref : "User" },
    content : { type: String, required: true },
}, {timestamps: true});

const Message = models.Message || model<IMessage>('Message', messageSchema);
export default Message; 