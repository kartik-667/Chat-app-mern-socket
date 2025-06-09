import jwt from "jsonwebtoken"

const createToken= (userid,res)=>{
    const token=jwt.sign({userid},process.env.JWT_SECRET)

    res.cookie("token",token,{
        httpOnly:true
    })

}

export default createToken