

import { User } from "../../databases/models/user.models.js";
import { catchError } from "./catchError.js";




export const canAccessDoctorData = catchError(async (req, res, next) => {


    const loggedInUser = req.user;

    if (loggedInUser.role === "doctor" && req.params.id === loggedInUser.userId) {
               
        return next();
    }

    if (loggedInUser.role === "admin") {
    
        return next()
    }


    return next(new AppError("Forbidden: You don't have access to this patient data", 403));

})