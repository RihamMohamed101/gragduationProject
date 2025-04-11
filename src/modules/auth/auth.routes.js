
import { Router } from "express";
import { signin, signup } from "./auth.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";



const authRouer = Router()
authRouer.post('/signup',checkEmail,signup)
authRouer.post('/signin', signin)

export default authRouer