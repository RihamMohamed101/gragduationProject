import { User } from "../../../databases/models/user.models.js";
import { catchError } from "../../middleware/catchError.js";






export const addScan = catchError(async (req, res, next) => {
    const user = req.user;

    if (!req.file) {
        return next(new AppError("No file uploaded", 400));
    }

    let uploadedFor; 

    if (user.role === "patient") {
        uploadedFor = user.userId;
        
    } else if (user.role === "assistant") {
        const patient = await User.findOne({ assistantId: user.userId });

         if (!patient) {
        return next(new AppError("No patient associated with this assistant", 403));
        }
        
        uploadedFor = patient._id;
    }

    const scanData = {
        filePath: req.file.filename,
        uploadedBy: uploadedFor,
    };

    await User.findByIdAndUpdate(
        uploadedFor,
        { $push: { scans: scanData } },
        { new: true }
    );

    res.status(201).json({
        message: "Scan uploaded successfully",
    });
});
