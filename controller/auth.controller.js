import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { userModel } from '../DB/models/user.model.js'
import { myEmail } from '../service/sendEmail.js'




export const signup=async(req,res)=>{
    try {
        const { userName, email, password ,cPassword} = req.body
    const user=await userModel.findOne({email})
    if(user){
        res.status(400).json({message:"email already exist"})
    }
    else{
        const hashpassword=await bcrypt.hash(password, 8)
       
        const newUser = new userModel({ email, password: hashpassword,  userName })
        const savedUser = await newUser.save()
       
        const token=jwt.sign({id:savedUser._id},'emailToken')
        const link=`${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}`
        const message=`<a href=${link}>follow link to activate</a>`
        myEmail(savedUser.email, message)
        res.status(201).json({message:"done",savedUser})
    }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }
    
}


export const confirmEmail=async(req,res)=>{
    try {
    const {token}=req.params
    const decoded=jwt.verify(token,'emailToken')
    if(decoded&&decoded.id){
        const user=await userModel.findById(decoded.id)
        if(user){
            if(user.confirmEmail==false){
                const confirmUser=await userModel.updateOne({_id:user._id},{confirmEmail:true},{new:true})
                res.status(200).json({message:"please logIn"})
            }else{res.status(400).json({message:"email already confirmed!!"})}
            
        }else{res.status(400).json({message:"invalid account"})}
    }else{
        res.status(400).json({message:"invalid token email"})
    }
        
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }
    
}

export const signIn=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if((!user)||user.isDeleteted){
            res.status(400).json({message:"invalid  account"})
        }else{
            if(user.confirmEmail==true){
                const match = await bcrypt.compare(password, user.password)
                if(!match){
                    res.status(400).json({message:" password is incorrect"})
                }else{
                    const acesstoken=jwt.sign({id:user._id,isLoggedIn: true },'access token', )
                    
                
                    res.status(200).json({message:" done",acesstoken})
                }
            }else{
                res.status(400).json({message:" please confirm your email first"})
            }
       
    }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }
    
}