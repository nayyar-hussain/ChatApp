import mongoose, { Schema, Document } from 'mongoose';

export interface IFriendRequest extends Document {
    senderId: string;
    receiverId: string;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}

const FriendRequestSchema: Schema = new Schema(
    {
        senderId: { type: String, required: true },
        receiverId: { type: String, required: true },
        status: { 
            type: String, 
            enum: ['pending', 'accepted', 'rejected'], 
            default: 'pending' 
        },
    },
    { timestamps: true }
);

const FriendRequest = mongoose.model<IFriendRequest>('FriendRequest', FriendRequestSchema);

export default FriendRequest