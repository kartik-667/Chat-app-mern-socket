import express from "express"
import User from "../models/user.model.js"
import  bcrypt from "bcryptjs"
import createToken from "../lib/utils.js"
import { protectRoute } from "../middleware/auth.controller.js"
import cloudinary from "../lib/cloudinary.js"
import { checkAuth } from "../controller/auth.controller.js"
const router=express.Router()

router.post("/login",async (req,res)=>{
    // res.send("login page")
    try {
        const {email,password}=req.body 

    if(!email || !password){
        return res.status(400).json({error:"invalid credentials"})
        
    }
    
    const userfound=await User.findOne({email})
    if(userfound){
        const ispasscorrect=await bcrypt.compare(password,userfound.password)
        if(ispasscorrect){
            //login success
            createToken(userfound._id,res)
            return res.status(200).json({
                userid:userfound._id
            })

        }else{
            return res.status(400).json({error:"invalid credentials"})

        }
    }else{
        return res.status(404).json({error:"invalid credentials"})
    }

        
    } catch (error) {
        console.log("some error occured",error.message);
        return res.status(500).json({error:"internal server error"})

        
    }
    

})
router.post("/signup",async (req,res)=>{
    // res.send("signup page")
    try {
         const {name,email,password} = req.body

         if(!name || !email || !password) return res.status(400).json({error:"all field are required...."})
    if(password.length<5){
        return res.status(400).json({error:"password length is too short"})
    }

    const olduser=await User.findOne({email})
    
    if(olduser){
        return res.status(400).json({error:"user already exist "})
        
    }
    
    const salt=await bcrypt.genSalt(10)
    const hashedPass=await bcrypt.hash(password,salt)
    
    const newuser=await User.create({
        name,
        email,
        password:hashedPass
        
    })
    
    if(!newuser){
        return res.status(400).json({error:"some error in creating user, invalid data "})
        
    }

    createToken(newuser._id,res)
    return res.status(201).json({
        userid:newuser._id
    })

        
    } catch (error) {
        console.log("some error occured",error.message);
        return res.status(500).json({error:"internal server error"})
        
        
    }
   
    

    //if new user created



})

router.post("/logout",(req,res)=>{
    // res.send("logout page")
    //in this, we just have to clear cookies, to logout
    try {
        res.cookie("token","")
        return res.status(200).json({message:"cleared cookies, logout successfully"})
        
    } catch (error) {
        return res.status(500).json({err:"some error occured"})
        
    }

})

router.put("/updateprofile",protectRoute,async (req,res)=>{
    // res.send("update page here")
    try {
    const {profilepic} = req.body
    const userid=req.user._id

    if(!profilepic) {
        return res.status(400).json({msg:"profile pic required"})
    }
    const uploadresponse=await cloudinary.uploader.upload(profilepic)

    const updateduser=await User.findByIdAndUpdate(userid,{profilepic:uploadresponse.secure_url},{new:true}).select("-password")

    res.status(200).json(updateduser)
    } catch (error) {
        return res.status(500).json({error:"some internal error occured"})
        
    }
   



})

router.get('/check',protectRoute,checkAuth)


export default router