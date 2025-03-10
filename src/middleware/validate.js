import { AppError } from "../utils/appError.js"




export const validate = (schema) => {
    return (req, res, next) => {
        let { error } = schema.validate({...req.body ,...req.params , ...req.query}, { abortEarly: false })
        if (!error) {
            next()
        }
        else {
            let errMsg = error.details.map(val => val.message)
            next(new AppError(errMsg,401))
        }
    }
}



