export const checkAuth=(req,res)=>{
    try{
        return res.status(200).json(req.user)
        
    }catch(error){
        
        console.log(error.message);
        
        return res.status(404).json({msg:"user not found"})
    }
}