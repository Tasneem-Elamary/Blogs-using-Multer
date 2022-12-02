import { Router } from "express";
import { addblog, addpictures, addvedio, AllblogsWiththeirOwners, likePost, unlikePost } from "../controller/blog.controller.js";
import { auth } from "../middleware/authentication.js";
import { HME, myMulter, validationTypes } from "../service/clodMulter.js";



const router = Router()




 router.post('/', auth(), addblog)
 router.patch('/addpictures/:id',
    myMulter(validationTypes.iamge).array('image',3),
    HME, auth(), addpictures)
router.patch('/addvedio/:id',
    myMulter(validationTypes.vedio).single('video'),
    HME, auth(), addvedio)
    router.get('/allblogs',auth(),AllblogsWiththeirOwners)
    router.patch('/like/:id' ,auth() , likePost)
    router.patch('/unlike/:id' ,auth() , unlikePost)



export default router