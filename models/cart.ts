import mongoose, { Schema } from 'mongoose';

// Cart Item Schema
const CartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name : {
    type : String,
    required : true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  }, 
  image : {
    type : String,
    required : true
  }
}, { timestamps: true });

// Cart Schema
const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  sessionId: {
    type: String,
    default: null
  },
  items: [CartItemSchema],
  totalAmount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Calculate total amount before saving
CartSchema.pre('save', function(next) {
  this.totalAmount = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  next();
});
export const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);
