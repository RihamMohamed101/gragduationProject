
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"
import { User } from "../../../databases/models/user.models.js";


export const addUser = catchError(async (req, res, next) => {
    
    let user = new User(req.body)
    await user.save()

    res.status(201).json({message:"success" , user})
}
)

export const getUser = catchError(async(req, res , next) => {
    let user = await User.findById(req.params.id)
    return user ? res.status(200).json({ message: "success", user })
                : next(new AppError("User not founded" , 404))
} 
)
export const allUsers = catchError(async (req, res, next) => {
    let users = await User.find()
     return users.length > 0 ? res.status(200).json({ message: "success", users })
                                 : next(new AppError("User not founded" , 404))
})

export const updateUser =  catchError(async (req, res, next) => {
    
    
    
   let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    

     return user ? res.status(200).json({ message: "success", user })
                     : next(new AppError("User not founded" , 404))
}
)
export const deleteUser = catchError(async (req, res, next) => {


    let user = await User.findByIdAndDelete(req.params.id)
     
    return user ? res.status(200).json({ message: "success", user })
                     : next(new AppError("User not founded" , 404))
})