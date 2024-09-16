// Add this line at the top of your file
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },  // Ensure password is hashed
    role: { type: String, enum: ['customer', 'vendor', 'admin'], required: true, default : "customer" },
    phone: { type: String, required: true },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const User = mongoose.models.User ||  mongoose.model('User', UserSchema);
