import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute=async (req,res,next)=>{
    try {

        const token=req.cookies.token
        

        if(!token){
            return res.status(400).json({error:"auth failedd"})
            
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(400).json({error:"auth failed"})

        }

        req.user=await User.findById(decoded.userid).select("-password")
        next()



        
    } catch (error) {
        return res.status(400).json({error:"auth failedd"})
        
    }
}