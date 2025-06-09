import express, { urlencoded } from "express"
import dotenv from "dotenv"
import authRouter from "../routes/auth.route.js"
import cookieparser from "cookie-parser"
dotenv.config()


import connectDB from "../lib/db.js"


const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())

app.use("/api/auth",authRouter)




app.listen(process.env.PORT,()=>{
    console.log("Listening on port ");
    connectDB();
    
})


