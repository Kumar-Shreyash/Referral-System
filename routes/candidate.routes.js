const express=require("express")
const { referCandidate, candidatesReffered, updateRef, deleteCandidate } = require("../controllers/candidate.controller")
const { authMiddleware } = require("../middlewares/auth.middleware")
const CandidateRouter=express.Router()

CandidateRouter.get("/",authMiddleware(),candidatesReffered)

CandidateRouter.post("/",authMiddleware(),referCandidate)

CandidateRouter.put("/:id/status",authMiddleware(),updateRef)

CandidateRouter.delete("/:id",authMiddleware(),deleteCandidate)

module.exports={CandidateRouter}