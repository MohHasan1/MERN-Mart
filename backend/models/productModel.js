import mongoose, { mongo } from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, required:true, ref:"User" },
        name:{ type:String, required:true },
        rating:{ type:String, required:true }, 
        comment:{ type:String, required:true }, 
    },
    {
        timestamps:true,
    }
);

const productSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, required:true, ref:"User" },
        name: { type:String, required:true },
        price: { type:Number, default:0, required:true},
        image: { type:String, required:true },
        inStock: { type:Number, required:true, default:0 },
        brand: { type:String, required:true},
        category: { type:String, required:true },
        description: { type:String, required:true },
        rating: { type:Number, default:0, required:true },
        numReview: { type:Number, required:true, default:0 },
        reviews: [reviewSchema],

    }, 
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;