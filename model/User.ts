import { Schema, Document, models, model } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  ImageUrl: string; // Changed to lowercase for consistency
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    _id: { type: String, required: true }, // Clerk ID
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email']
    },
    ImageUrl: { type: String, required: true }, // Fixed casing
    bio: { type: String, default: '', maxlength: 500 }
  },
  {
    timestamps: true,


  }
);

// Clear model cache if needed in development

const User = models.User || model<IUser>('User', UserSchema);

export default User;