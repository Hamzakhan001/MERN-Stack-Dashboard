
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";



export const getProducts=async(req,res)=>{
	try {
		// console.log("here",req)
		const products= await Product.find().populate('productDetails').exec()
		// console.log("products",products)
		// const productstats= await Promise.all(
		// 	products.map(async(prod)=>{
		// 		const stat=await Product.findById(prod._id)
		// 		return {
		// 			prod,
		// 			...prod._doc
		// 		}
		// 	})
		// )
		res.status(200).json(products)
	}
	catch(err) {
		console.log("req",req.params)
		res.status(404).json({'message':err.message})
	}
}


