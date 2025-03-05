import { User } from "../../databases/models/user.models.js"
import { AppError } from "../utils/appError.js"



export const checkEmail = async (req, res, next)=>{
    let isExit = await User.findOne({ email: req.body.email })
   return isExit ? next(new AppError("this email already exit", 409))
                 :   next()
}