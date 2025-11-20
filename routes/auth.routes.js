const express=require("express")
const { signup, signIn } = require("../controllers/auth.controllers")
const AuthRouter=express.Router()

AuthRouter.post("/signup",signup)

AuthRouter.post("/signin",signIn)

module.exports={AuthRouter}