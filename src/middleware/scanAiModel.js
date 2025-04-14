

import axios from "axios";
import { catchError } from "./catchError.js";
import { AppError } from "../utils/appError.js";

export const analyzeScan = catchError(async (req, res, next) => {
    const scan = req.savedScan;

    if (!scan) {
        return next(new AppError("not found scan" , 400));
    }

    try {
        const aiResponse = await axios.post("http://localhost:5000/analyze", {
            filePath: `uploads/scans/${scan.filePath}`
        });

        if (aiResponse.data) {
            scan.analyzed = true;
            scan.analysisResult = aiResponse.data.result;
            await scan.save();
        }

    } catch (error) {
         console.error("AI analysis failed:", error.message);
         return next(new AppError("AI analysis failed:" , 401))
    }

    res.status(201).json({
        message: "Scan uploaded and analyzed",
        scan
    });
});
