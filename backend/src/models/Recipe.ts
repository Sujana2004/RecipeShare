import mongoose, { Document, Schema } from 'mongoose';

export interface IRecipe extends Document {
  title: string;
  description: string;
  fileUrl?: string;
  category: string;
  createdBy: mongoose.Types.ObjectId;
  //createdAt: Date;
}

const recipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fileUrl: { type: String }, 
  category: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // createdAt: { type: Date, default: Date.now }
},{timestamps:true});

export default mongoose.model<IRecipe>('Recipe', recipeSchema);
