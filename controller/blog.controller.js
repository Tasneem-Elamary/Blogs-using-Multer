import { blogModel } from "../DB/models/blog.model.js"
import cloudinary from "../service/cloudinary.js"

export const addblog = async (req, res) => {

        const { title,description} = req.body
       // const { secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: `Gallary/${req.user._id}` })
        const newblog = new blogModel({ title,description, createdBy: req.user._id })
        const savedblog = await newblog.save()
        res.status(201).json({ message: "Done", savedblog })
    
}

export const addpictures = async (req, res) => {

    
   const urls = []
         for (const file of  req.files) {
            const {secure_url} = await cloudinary.uploader.upload(file.path, {
                folder: `blog/pictures/${req.params.id}`
            })
            urls.push(secure_url)
         }
         
         await blogModel.updateOne({ _id: req.params.id }, { pictures: urls })
         res.status(200).json({ message: "Done", urls })

}

export const AllblogsWiththeirOwners = async (req, res) => {
   const blogs= await blogModel.find({}).populate([
    {
        path: "createdBy",
        select: "userName email",
        match: { isDeleteted: false }
    },

])
res.status(200).json({ message: "Done", blogs })

}

export const likePost = async (req, res) => {
    const { id } = req.params;
   // const doc = new blogModel();
    const post = await blogModel.updateOne({ _id: id, likes: { $nin: req.user._id } },
        {
            $push: { likes: req.user._id },
            $pull: { unlike: req.user._id },
           // $inc: { totalCount: 1 }
        })
    res.status(200).json({ message: "Done", post })
}



export const unlikePost = async (req, res) => {
    const { id } = req.params;

    const findblog = await blogModel.findOne({ _id: id, unlike: { $nin: req.user._id } })
    if (!findblog) {
        res.json({message:"Already unlike"})
    } else {
        //const doc = new Model();
        const blog = await blogModel.updateOne({ _id: id, unlike: { $nin: req.user._id } },
            {
                $push: { unlike: req.user._id },
                $pull: { likes: req.user._id },
                // $inc: { totalCount: -1 }
            })
    
        res.status(200).json({ message: "Done", blog })
    }

}

export const addvedio = async (req, res) => {

    if (!req.file) {
        res.json({ message: "Please upload u vedio" })
    } else {

       //console.log(req.file.path);
        const {secure_url} = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "video",
            folder: `blog/Video/${req.params.id}`
           
          })
        // const image = req.file.destination + "/" + req.file.filename
      console.log(secure_url);
        await blogModel.updateOne({ _id: req.params.id }, { video:secure_url })
        res.status(200).json({ message: "Done", secure_url })
    }

}