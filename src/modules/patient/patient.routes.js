import { Router } from "express";
import { addPatient, deletePatientByDoctor, getMyPatients, getPatient, updatePatientByDoctor } from "./patient.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { canAccessPatientData } from "../../middleware/canAccessPatientData.js";
import { checkEmail } from "../../middleware/checkEmail.js";



const patientRouter = Router()

patientRouter.get('/:id'
    , protectedRoutes, allowedTo( 'doctor', 'assistant', 'patient')
    , canAccessPatientData, getPatient)

patientRouter.get('/',protectedRoutes,
    allowedTo('doctor'),getMyPatients )

patientRouter.post('/', protectedRoutes, allowedTo('doctor'),checkEmail, addPatient)

patientRouter.put('/:id', protectedRoutes,
    allowedTo('doctor'), updatePatientByDoctor)

patientRouter.delete('/:id', protectedRoutes,
    allowedTo('doctor'), deletePatientByDoctor)

    
export default patientRouter