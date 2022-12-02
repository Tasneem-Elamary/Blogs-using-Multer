import { Router } from "express";
import { profileCov, profilePic, sendpdfToMales, updateProfile } from "../controller/user.controller.js";
import { auth } from "../middleware/authentication.js";
import { HME, myMulter, validationTypes } from "../service/clodMulter.js";



const router = Router()




 router.put('/profile',auth(),myMulter(validationTypes.iamge).single('image'),HME,updateProfile )
router.patch('/profile/pic',
    myMulter(validationTypes.iamge).single('image'),
    HME, auth(), profilePic)
router.patch('/profile/cov',
    myMulter(validationTypes.iamge).array('image', 3),
    HME, auth(), profileCov)
router.get("/sendPdf",auth(),myMulter(validationTypes.pdf).single('pdf'),sendpdfToMales)




export default router