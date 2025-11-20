const express=require("express")
const { connectToDB } = require("./configs/db.config")
const { AuthRouter } = require("./routes/auth.routes")
const { CandidateRouter } = require("./routes/candidate.routes")
const app=express()
const cors = require("cors");
app.use(cors());

app.use(express.json())
require("dotenv").config()
connectToDB()

app.use("/auth",AuthRouter)

app.use("/candidate",CandidateRouter)

app.use((req,res)=>{
    res.status(404).json({message:"Invalid route"})
})

app.listen(process.env.PORT,()=>{
    console.log("Server Running...")
})