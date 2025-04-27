





import { Medicine } from "../../databases/models/medicine.model.js";
import { User } from "../../databases/models/user.models.js";
import { AppError } from "../utils/appError.js";
import { catchError } from "./catchError.js";




export const canAccessMedData = catchError(async (req, res, next) => {

  
      let medicine = await Medicine.findById(req.params.id);
      let patient = await User.findById(medicine.prescribedTo)
      
  
      if (!medicine) {
         return next(new AppError("Medication not found for this patient", 404));
      }
  
  
      if (req.user.userId != patient.doctorId) {
          return next(new AppError("Forbidden: You don't have access to this patient data", 403));
      }
      

     next()

})