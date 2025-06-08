import mongoose from "mongoose"

const connectDB= async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo connection successful : ",conn.connection.host);
        

    }catch(error){
        console.log("some error occured in connection", error.message);
        
    }
}
export default connectDB