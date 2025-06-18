import express from "express"
import { protectRoute } from "../middleware/auth.controller.js"
import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId, io } from "../lib/socket.js"

const msgRouter=express.Router()

msgRouter.get('/users',protectRoute,async (req,res)=>{
    try {
        const myId=req.user._id
    
        const allusers=await User.find({_id : {$ne:myId}}).select("-password") //except our id
    
        return res.status(200).json(allusers)
        
    } catch (error) {
        return res.status(500).json({error:"some internal error occured"})
        
    }
    
})

msgRouter.get("/:id",protectRoute,async (req,res)=>{
    
    try {
        const myId=req.user._id
        const receiverId=req.params.id
        
        const messages=await Message.find({
            $or:[
                {senderid:myId, receiverid:receiverId},
                {senderid:receiverId, receiverid:myId}
            ]
        })
        
        return res.status(200).json(messages)
        
    } catch (error) {
        
        return res.status(500).json({error:"some internal error occured"})
    }
    
    
    
    
    
    
    
})

msgRouter.post("/send/:id",protectRoute,async (req,res)=>{
    try {
        const myId=req.user._id
        const receiverId=req.params.id
        const {text,image} = req.body
        
        // if(!text || !image){
        //     return res.status(400).json("data not received, try again")
            
        // }
        let imageurl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image)
            imageurl=uploadResponse.secure_url
        }
        
        const newmsg=await Message.create({
            senderid:myId,
            receiverid:receiverId,
            text,
            image:imageurl
            
        })

        //real time using socket.io here for future
        if(newmsg){
            const rec_socket_id=getReceiverSocketId(receiverId)
            io.to(rec_socket_id).emit("newMessage",newmsg)
        }
        
        if(newmsg){
            return res.status(201).json(newmsg)
        }else{
            return res.status(400).json("some error in sending data")
            
        }
        
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({error:"some internal error occured"})
        
    }

})



export default msgRouter