import { Router } from "express";
import { addRadiologist, deleteRadio, RadiologistSignin, updateRadio } from "./radiologist.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { canAccessRadio } from "../../middleware/canAccessRadio.js";
import { checkEmail } from "../../middleware/checkEmail.js";




const radiologistRouter = Router();

radiologistRouter.post('/signin',RadiologistSignin)
radiologistRouter.post('/', protectedRoutes, allowedTo('admin'), checkEmail,addRadiologist)
radiologistRouter.put('/:id', protectedRoutes, allowedTo('admin', 'Radiologist'), canAccessRadio, updateRadio)
radiologistRouter.delete(':id' , protectedRoutes , allowedTo('admin' ,'Radiologist') , canAccessRadio, deleteRadio)

export default radiologistRouter