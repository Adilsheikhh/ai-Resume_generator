import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  userId: string;
  title: string;
  content: string;
  template: string;
  createdAt: Date;
  updatedAt: Date;
  isEnhanced: boolean;
  score?: number;
  feedback?: string;
  version: number;
}

const ResumeSchema = new Schema<IResume>({
  userId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  template: { type: String, required: true, default: 'modern' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isEnhanced: { type: Boolean, default: false },
  score: { type: Number },
  feedback: { type: String },
  version: { type: Number, default: 1 },
});

ResumeSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema);