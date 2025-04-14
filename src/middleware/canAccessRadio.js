

import { User } from "../../databases/models/user.models.js";
import { AppError } from "../utils/appError.js";
import { catchError } from "./catchError.js";




export const canAccessRadio = catchError(async(req, res, next) => {
  
    
    const loggedInUser = req.user; 
    const radioId = req.params.id;
    
    const radio = await User.findById(radioId);

        if (!radio || radio.role !== "Radiologist") {
            return next(new AppError("Radiologist not found", 404));
       }
   
    if (loggedInUser.role === "Radiologist" && radioId === loggedInUser.userId) {
           return next();
    }
    
    if (loggedInUser.role === "admin") {
       return next()
    }
        
    
    return next(new AppError("Forbidden: You don't have access to this Radiologist data", 403));
    
})