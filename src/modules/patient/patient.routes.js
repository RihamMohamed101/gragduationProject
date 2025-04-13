import { Router } from "express";
import { addPatient, deletePatientByDoctor, getMyPatients, getPatient, updatePatientByDoctor } from "./patient.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { canAccessPatientData } from "../../middleware/canAccessPatientData.js";
import { checkEmail } from "../../middleware/checkEmail.js";



const patientRouter = Router({mergeParams:true})

patientRouter.get('/:id'
    ,protectedRoutes, allowedTo('doctor','patient','admin')
    ,canAccessPatientData, getPatient)

patientRouter.get('/',protectedRoutes,
    allowedTo('admin','doctor'),getMyPatients )

patientRouter.post('/', protectedRoutes, allowedTo('doctor','admin'),checkEmail,addPatient)

patientRouter.put('/:id', protectedRoutes,
    allowedTo('doctor'),canAccessPatientData, updatePatientByDoctor)

patientRouter.delete('/:id', protectedRoutes,
    allowedTo('doctor' , 'admin'),canAccessPatientData, deletePatientByDoctor)

    
export default patientRouter