import mongoose, { Schema, Document } from "mongoose";

export interface IProperty extends Document {
  title: string;
  latitude: number;
  longitude: number;
}

const PropertySchema = new Schema<IProperty>({
  title: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

export default mongoose.models.Property ||
  mongoose.model<IProperty>("Property", PropertySchema);
