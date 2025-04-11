import authRouer from "./auth/auth.routes.js"
import patientRouter from "./patient/patient.routes.js"
import scanRouter from "./scan/scan.routes.js"



export const bootstrab = (app) => {
    app.use('/api/auth', authRouer)
    app.use('/api/patientes', patientRouter)
    app.use('/api/scan' , scanRouter)
}