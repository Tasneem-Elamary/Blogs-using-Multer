import { userModel } from "../DB/models/user.model.js"
import cloudinary from "../service/cloudinary.js";
import { myEmail } from '../service/sendEmail.js'

export const updateProfile=async(req,res)=>{
    console.log(req.file);
    const{userName,profilePic,coverPics}=req.body
    if(req.file||req.files){
        res.status(400).json({ message: "you cannot update your profile or cover pictures"})
    }else{
        const updatedUser=await userModel.findByIdAndUpdate(req.user._id,{userName},{new:true})
        res.status(200).json({ message: "done", updatedUser })
    }
    
}


export const softDeleteProfile=async(req,res)=>{
   const user=await userModel.findById(req.user._id)
   console.log(req.user._id);
   if(user.isDeleteted==false){
      const deletedUser=await userModel.findByIdAndUpdate(req.user._id,{isDeleteted:true},{new:true})
      
      res.status(200).json({ message: "done", deletedUser })
   }else{
      res.status(400).json({ message: "user is already soft deleted" })
   }
  
}

export const profilePic = async (req, res) => {

    if (!req.file) {
        res.json({ message: "Please upload u image" })
    } else {

       console.log(req.file);
        const {secure_url} = await cloudinary.uploader.upload(req.file.path, {
            folder: `user/profilePic/${req.user._id}`
        })
        // const image = req.file.destination + "/" + req.file.filename

        await userModel.updateOne({ _id: req.user._id }, { profilePic:secure_url })
        res.status(200).json({ message: "Done", secure_url })
    }

}
export const profileCov = async (req, res) => {

    if (!req.files) {
        res.json({ message: "Please upload u image" })
    } else {
      
         const urls = []
         for (const file of  req.files) {
            const {secure_url} = await cloudinary.uploader.upload(file.path, {
                folder: `user/profilePic/${req.user._id}`
            })
            urls.push(secure_url)
         }
         
        
        
        console.log(urls);
         await userModel.updateOne({ _id: req.user._id }, { coverPics: urls })
         res.status(200).json({ message: "Done", urls })
    }

}

export const sendpdfToMales=async(req,res)=>{
    const maleEmails=await userModel.find({gender:"Male"}).select("-_id email")
    console.log(maleEmails);
    const {url} = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'image',
        folder: `user/pdf/${req.user._id}`
    })
     for (const emailobj of maleEmails) {
        const{email}=emailobj
        console.log(email);
        const message=`<a href=${url}>follow link to the pdf</a>`
        myEmail(email, message)
     }

    res.status(200).json({ message: "Done" })
}