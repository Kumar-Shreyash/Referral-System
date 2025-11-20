const mongoose=require("mongoose")

const candidateSchema=new mongoose.Schema({
    name:{type:String,required:true,minlength:5},
    email:{type:String,required:true,unique:true},
    mobile:{type:String,required:true,unique:true,minlength:10,maxlength:10},
    jobTitle:{type:String,required:true},
    status:{type:String,enum:["Pending","Reviewed","Hired"],default:"Pending"},
    referredBy:{type: mongoose.Schema.Types.ObjectId, ref: "users"},
    referredOn:{type:Date,default:Date.now}
})

const CandidateModel=mongoose.model("candidates",candidateSchema)
module.exports={CandidateModel}