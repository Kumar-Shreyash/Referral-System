const mongoose=require("mongoose")

const candidateSchema=new mongoose.Schema({
    name:{type:String,required:true,minlength:5},
    email:{type:String,required:true,unique:true},
    mobile:{type:String,required:true,unique:true,minlength:10,maxlength:10},
    jobTitle:{type:String,required:true},
    status:{type:String,enum:["Pending","Reviewed","Hired"],default:"Pending"},
    referredOn:{type:Date,default:Date.now}
})

const CandidateModel=mongoose.model("Candidates",candidateSchema)
module.exports={CandidateModel}