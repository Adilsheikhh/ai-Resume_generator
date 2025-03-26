import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  isPremium: boolean;
  resumeCount: number;
  lastLogin: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isPremium: { type: Boolean, default: false },
  resumeCount: { type: Number, default: 0 },
  lastLogin: { type: Date, default: Date.now },
});

UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);