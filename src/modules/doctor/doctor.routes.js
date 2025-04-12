import { canAccessDoctorData } from "../../middleware/canAccessDoctor.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import patientRouter from "../patient/patient.routes.js";
import { addDoctor, allDoctors, deleteDoctor, getDoctor, updateDoctor } from "./doctor.controller.js";

import { Router } from "express";






const doctorRouter = Router()
doctorRouter.use('/:doctorId/patients',patientRouter)

doctorRouter.route('/')
    .post(
     protectedRoutes,
     allowedTo('admin'), addDoctor)
       .get(protectedRoutes,
           allowedTo('admin'), allDoctors)
           


doctorRouter.route('/:id')
    .put(protectedRoutes,
     allowedTo('admin', 'doctor'),
        canAccessDoctorData, updateDoctor)
    
        .delete(protectedRoutes,
        allowedTo('admin', 'doctor'),
            canAccessDoctorData, deleteDoctor)
    
    .get(protectedRoutes, allowedTo('admin', 'doctor'),
       canAccessDoctorData , getDoctor )


             



export default doctorRouter