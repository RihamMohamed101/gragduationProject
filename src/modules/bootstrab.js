import authRouer from "./auth/auth.routes.js"
import doctorRouter from "./doctor/doctor.routes.js"
import medicineRoute from "./medicine/medicine.routes.js"

import patientRouter from "./patient/patient.routes.js"
import radiologistRouter from "./radiologist/radiologist.routes.js"
import scanRouter from "./scan/scan.routes.js"



export const bootstrab = (app) => {
    app.use('/api/auth', authRouer)
    app.use('/api/patientes', patientRouter)
    app.use('/api/doctors', doctorRouter)
    app.use('/api/medicine',medicineRoute)
   
    //web
    app.use('/api/radiologist', radiologistRouter)
    app.use('/api/scan', scanRouter)
    

    
    
}