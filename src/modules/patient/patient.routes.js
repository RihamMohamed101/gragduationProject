import { Router } from "express";
import {addPatient } from "./patient.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { canAccessPatientData } from "../../middleware/canAccessPatientData.js";




const patientRouter = Router({mergeParams:true})

// patientRouter.get('/:id'
//     ,protectedRoutes, allowedTo('doctor','patient','admin')
//     ,canAccessPatientData, getPatient)

// patientRouter.get('/',protectedRoutes,
//     allowedTo('admin','doctor'),getMyPatients )

patientRouter.post('/', protectedRoutes, allowedTo('admin'),addPatient)

// patientRouter.put('/:id', protectedRoutes,
//     allowedTo('doctor'),canAccessPatientData, updatePatientByDoctor)

// patientRouter.delete('/:id', protectedRoutes,
//     allowedTo('doctor', 'admin'), canAccessPatientData, deletePatientByDoctor)
    

// // medicine

// patientRouter.post('/:id/medicine', protectedRoutes, allowedTo('doctor')
//     , addMedicine)
 
// patientRouter.put('/:patientId/medicine/:medicineId', protectedRoutes, allowedTo('doctor'),
//     updateMedicine)

// patientRouter.delete('/:patientId/medicine/:medicineId', protectedRoutes, allowedTo('doctor'),
//     deleteMedicine)


    
export default patientRouter