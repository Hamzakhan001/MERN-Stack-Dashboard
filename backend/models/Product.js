import mongoose, { mongo } from 'mongoose'


const ProductSchema=new mongoose.Schema({
	name:String,
	price:Number,
	description:String,
	category:String,
	rating:Number,
	supply:Number,
	productDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductStat' },

}, {
	timestamps:true
})

const Product= mongoose.model("Product",ProductSchema);
export default Product;