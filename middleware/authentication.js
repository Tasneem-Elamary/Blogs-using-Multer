import { userModel } from "../DB/models/user.model.js"
import jwt from 'jsonwebtoken'



export const auth=()=>{
return async(req,res,next)=>{
    try {
        const {authentcation}=req.headers
        //console.log({authentcation});
        
        const decoded=jwt.verify(authentcation,'access token')

        if(decoded&&decoded.id){
            const user=await userModel.findById(decoded.id).select('email userName ')
            if(user){
                req.user=user
               
                next()
                
                
            }else{
                res.json({message:"not register user"})
            }
        
        }else{
            res.json({message:"invalid payload token"})
        }
    } catch (error) {
        res.status(500).json({ message: "Catch error", error })

    }
       
    }
 
}
    