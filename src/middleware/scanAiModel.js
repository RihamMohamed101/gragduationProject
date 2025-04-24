

import axios from "axios";
import { catchError } from "./catchError.js";
import { AppError } from "../utils/appError.js";
import FormData from'form-data'

export const analyzeScan = catchError(async (req, res, next) => {
    const scan = req.savedScan;
    
    
    
    if (!scan) {
        return next(new AppError("not found scan" , 400));
    }

    try {

    const form = new FormData();
    form.append("image_url", scan.filePath);
        
    const aiResponse = await axios.post(
        "https://alz-apiri.onrender.com/predict",
       form,
       { headers: form.getHeaders() }
    );


   if (aiResponse.data) {
            scan.analyzed = true;
            scan.analysisResult = aiResponse.data.prediction;
            await scan.save();
        }

    } catch (error) {
         console.error("AI analysis failed:", error.response ? error.response.data : error.message);
         return next(new AppError("AI analysis failed:" , 401))
    }

    res.status(201).json({
        message: "Scan uploaded and analyzed",
        scan
    });
});
