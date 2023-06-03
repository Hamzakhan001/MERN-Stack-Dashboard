import mongoose, { mongo } from 'mongoose'


const UserSchema=new mongoose.Schema({
	name:{
		type:String,
		required:true,
		min:2,
		max:100
	},
	email:{
		type:String,
		required:true,
		min:50,
		unique:true
	},
	password:{
		type:String,
		required:true,
		min:8,
	},
	city:{
		type:String
	},
	state:{
		type:String
	},
	country:{
		type:String
	},
	occupation:{
		type:String
	},
	phoneNumber:{
		type:String
	},
	transactions:Array,
	role:{
		type:String,
		enum:['user','admin','superadmin'],
		default:'admin'
	}

}, {
	timestamps:true
})

const User= mongoose.model("User",UserSchema);
export default User;