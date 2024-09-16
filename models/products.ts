import mongoose from 'mongoose';

// Define the Product interface
export interface IProduct extends mongoose.Document {
  vendor: mongoose.Types.ObjectId;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  capacity?: {
    unit: 'volts' | 'watts' | 'amperes' | 'kilowatt-hours' | 'amp-hours';
    value: number;
  };
  warranty?: string;
  brand?: string;
  specifications?: {
    [key: string]: string | number;
  };
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Product Schema
const ProductSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  capacity: {
    unit: { type: String, enum: ['volts', 'watts', 'amperes', 'kilowatt-hours', 'amp-hours'], required: false },
    value: { type: Number, required: false }
  },
  warranty: { type: String, required: false },
  brand: { type: String, required: false },
  specifications: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  images: { type: [String], required: true },
}, { timestamps: true });

// Function to get the Product model
export function getProductModel(): mongoose.Model<IProduct> {
  return (mongoose.models.Product as mongoose.Model<IProduct>) || mongoose.model('Product', ProductSchema);
}