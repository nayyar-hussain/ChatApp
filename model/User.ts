import  { Schema, Document, models, model } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    ImageUrl: string;
    bio?: string;
    createdAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        ImageUrl: { type: String, required: true },
        bio: { type: String, default: '' },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

const User = models.User || model<IUser>('User', UserSchema);

export default User;