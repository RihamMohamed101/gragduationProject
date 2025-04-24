
import { Router } from "express";
import { signin, signup } from "./auth.controller.js";



const authRouer = Router()
authRouer.post('/signup',signup)
authRouer.post('/signin', signin)

export default authRouer