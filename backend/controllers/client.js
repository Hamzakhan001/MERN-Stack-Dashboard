
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from '../models/User.js';
import getCountryIso3 from "country-iso-2-to-3"



export const getProducts=async(req,res)=>{
	try {
		// console.log("here",req)
		const products= await Product.find()
		console.log("products",products)
		const productstats= await Promise.all(
			products.map(async(prod)=>{
				const stat=await Product.findById(prod._id)
				return {
					prod,
					...prod._doc
				}
			})
		)
		res.status(200).json(productstats)
	}
	catch(err) {
		console.log("req",req.params)
		res.status(404).json({'message':err.message})
	}
}


export const getCustomers = async (req,res)=>{
	try {
		const customers=await User.find({ role:"user" }).select("-password");
		res.status(200).json(customers)
	}
	catch(err) {
		console.log("req",req.params)
		res.status(404).json({'message':err.message})
	}
}

export const getTransactions = async (req,res)=>{
	try {

		const { page=1, pageSize=20, sort=null, search=" " }= req.query;
		
		const generateSort = () => {
			const sortParsed = JSON.parse(sort);
			const sortFormatted = {
				[sortParsed.field] : sortParsed.sort = "asc" ? 1: -1
			};

			return sortFormatted;
		}
		const sortFormatted = Boolean(sort) ? generateSort() : {};
		const transaction = await Transaction.find({
			$or: [
				{cost: {$regex: new RegExp(search,"i")}},
				{userId: {$regex: new RegExp(search, "i")}}
			]
		})
		.sort(sortFormatted)
		.skip(page * pageSize)
		.limit(pageSize)

		const total = await Transaction.countDocuments({
			name : {$regex : search, $options: "i"}
		})

		res.status(200).json({
			transaction,
			total
		})

		res.status(200).json(customers)
	}
	catch(err) {
		console.log("req",req.params)
		res.status(404).json({'message':err.message})
	}
}


export const getGeography = async (req,res)=> {
	try{
		const users = await User.find()
	const mappedLocations = users.reduce((acc, {country})=> {
		const countryIso3 = getCountryIso3(country)

		if(!acc[countryIso3]) {
			acc[countryIso3] = 0;
		}
		acc[countryIso3]++ ;
		return acc;
	},{})


	const formatedLocation = Object.entries(mappedLocations).map(([country,count]) => {
		return { id:country, value:count}
	})
	res.status(200).json(formatedLocation)

	}
	catch(err) 
	{
		res.status(404).json({message:err.message})
	}
	
}