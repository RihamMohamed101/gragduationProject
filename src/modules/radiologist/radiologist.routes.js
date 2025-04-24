import { Router } from "express";
import { addRadiologist, allRadio, deleteRadio, RadiologistSignin, updateRadio } from "./radiologist.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { canAccessRadio } from "../../middleware/canAccessRadio.js";
import { checkEmail } from "../../middleware/checkEmail.js";




const radiologistRouter = Router();

radiologistRouter.post('/signin',RadiologistSignin)
radiologistRouter.post('/', protectedRoutes, allowedTo('admin'),addRadiologist)
radiologistRouter.put('/:id', protectedRoutes, allowedTo('admin'), checkEmail, updateRadio)
radiologistRouter.delete('/:id', protectedRoutes, allowedTo('admin'), deleteRadio)
radiologistRouter.get('/' , protectedRoutes , allowedTo('admin') ,allRadio)

export default radiologistRouter