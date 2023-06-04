import User from '../models/User.js'


export const getUser=async(req,res)=>{
	try{
		console.log("req",req.params)
		const {id} = req.params;
		const user=await User.findById(id);
		res.status(200).json(user)

	}
	catch(err){
		console.log("req",req.params)
		res.status(404).json({'message':err.message})
	}
}

export const gethi=async(req,res)=>{
	console.log("three")
}