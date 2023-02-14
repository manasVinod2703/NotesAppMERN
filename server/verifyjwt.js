import jwt from 'jsonwebtoken'

export const verifyjwt = (req,res)=>{
    const {token} = req.body

    if(!token){
        res.status(400).json({
            status : "Failed",
            message : "Token is required for authentication!"
        })
    }

   
}