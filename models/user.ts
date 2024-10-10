// Add this line at the top of your file
import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },  // Ensure password is hashed
    role: { type: String, enum: ['customer', 'vendor', 'admin'], required: true, default: "customer" },
    phone: { type: String, required: true },
    
    // Address (shared by customers and vendors)
    addresses: [{
        name: { type: String },
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String }
    }],
    
    // Vendor-specific fields (if the user becomes a vendor)
    vendorDetails: {
        storeName: { type: String }, // Store name for the vendor
        businessName: { type: String }, // Optional business name
        storeDescription: { type: String }, // Description of the vendor's store
        storeLogo: { type: String }, // URL or file path for store logo
        businessPhone: { type: String }, // Business contact number
        businessEmail: { type: String }, // Business email (optional if different from personal email
        
        // Banking Information for receiving payments
        bankingInfo: {
            bankName: { type: String },
            accountNumber: { type: String },
            accountName: { type: String },
            bvn: { type: String } // Bank Verification Number (if applicable)
        },
        
        // Tax Information
        taxInfo: {
            tin: { type: String }, // Tax Identification Number (if applicable)
            businessLicense: { type: String } // Optional business license number
        },
        
        // Shipping information for vendor-specific logistics
        shippingInfo: {
            deliveryZones: [String], // Array of regions or countries where they ship
            shippingMethods: [String], // E.g., ["Local", "International"]
            handlingTime: { type: String } // Estimated time to process an order (e.g., "2 days")
        },
        // Terms for becoming a vendor 
        policies : {
            terms: { type : Boolean, required : true, default : false},
            returnPolicy: { type : Boolean, required : true, default :false},
            privacyPolicy: { type : Boolean, required : true, default : false}
        },
        
        // Product Categories
        productCategories: [String], // Array of categories they sell products in
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Export the model, reusing the model if it already exists
export const User = mongoose.models.User || mongoose.model('User', UserSchema);

