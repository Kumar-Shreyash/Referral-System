const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{type:String,required:true,minlength:5},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:8},
    referrals:[{ type: mongoose.Schema.Types.ObjectId, ref: "candidates" }]
})

const UserModel=mongoose.model("users",userSchema)
module.exports=UserModel