import authRouer from "./auth/auth.routes.js"



export const bootstrab = (app) => {
    app.use('/api/auth' ,authRouer)
}