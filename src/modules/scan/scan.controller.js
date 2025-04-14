import { Scan } from "../../../databases/models/scan.model.js";
import { User } from "../../../databases/models/user.models.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";






export const addScan = catchError(async (req, res, next) => {

    if (!req.file) {
        return next(new AppError("No file uploaded", 400));
    }

    let uploadedFor; 

    let patient = await User.findOne({ email: req.body.email })
    if (patient)
        uploadedFor = patient._id;
    else 
        next(new AppError("this patient not found in system", 401))

    
    const scanData = {
        filePath: req.file.filename,
        uploadedTo: uploadedFor,
    };

    let scan = new Scan(scanData)
    await scan.save()

    req.savedScan = scan;

    next();
});
