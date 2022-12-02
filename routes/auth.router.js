import { Router } from "express";
import { confirmEmail, signIn, signup } from "../controller/auth.controller.js";



const router = Router()




router.post('/signup'  ,signup)
router.get('/confirmEmail/:token',confirmEmail)
router.post('/signin',signIn)



export default router