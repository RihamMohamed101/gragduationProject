import { Router } from "express";
import { addUser, allUsers, deleteUser, getUser, updateUser } from "./user.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";




const userRouter = Router()

userRouter.route('/')
    .post(protectedRoutes , allowedTo('admin'),addUser)
    .get(protectedRoutes , allowedTo('admin') ,allUsers)
    
userRouter.route('/:id')
     .get(protectedRoutes, allowedTo('admin') , getUser)
     .put(protectedRoutes, allowedTo('admin'),updateUser)
     .delete(protectedRoutes, allowedTo('admin'),deleteUser)



export default userRouter