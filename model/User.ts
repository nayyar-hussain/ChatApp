import  { Schema, Document, models, model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    ImageUrl: string;
    bio?: string;
    createdAt: Date;
}
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    ImageUrl: { type: String, required: true },
    bio: { type: String, default: '' }
  },
  {
    timestamps: true,  // createdAt aur updatedAt auto manage honge
  }
);

const User = models.User || model<IUser>('User', UserSchema);

export default User;