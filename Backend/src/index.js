import express, { urlencoded } from "express"
import dotenv from "dotenv"
import authRouter from "../routes/auth.route.js"
import msgRouter from "../routes/msg.route.js"
import cookieparser from "cookie-parser"
dotenv.config()
import { app , server} from "../lib/socket.js"
import cors from "cors"


import connectDB from "../lib/db.js"

app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({extended:true, limit:"5mb"}))
app.use(cookieparser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRouter)
app.use("/api/message",msgRouter)




server.listen(process.env.PORT,()=>{
    console.log("Listening on port ");
    connectDB();
    
})


