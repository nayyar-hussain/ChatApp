import  { Schema, Document, models, model } from 'mongoose';

export interface IUser extends Document {
    _id : string;
    name: string;
    email: string;
    ImageUrl: string;
    bio?: string;
    createdAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        _id: { type: String, required: true , unique : true },
        name: { type: String, required: true,  },
        email: { type: String, required: true, unique: true },
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