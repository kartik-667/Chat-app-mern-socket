import express, { urlencoded } from "express"
import dotenv from "dotenv"
import authRouter from "../routes/auth.route.js"
import msgRouter from "../routes/msg.route.js"
import cookieparser from "cookie-parser"
dotenv.config()
import cors from "cors"


import connectDB from "../lib/db.js"


const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRouter)
app.use("/api/message",msgRouter)




app.listen(process.env.PORT,()=>{
    console.log("Listening on port ");
    connectDB();
    
})


