

import axios from "axios";
import { catchError } from "./catchError.js";
import { AppError } from "../utils/appError.js";

import fs from 'fs'
import FormData from'form-data'

export const analyzeScan = catchError(async (req, res, next) => {
    const scan = req.savedScan;

    if (!scan) {
        return next(new AppError("not found scan" , 400));
    }

    try {

const filePath = `uploads/scans/${scan.filePath}`; 
 const form = new FormData();
        
form.append('file', fs.createReadStream(filePath)); 

const aiResponse = await axios.post("https://alz1api-production.up.railway.app/predict", form, {
  headers: {
    ...form.getHeaders()
  }
});

   if (aiResponse.data) {
            scan.analyzed = true;
            scan.analysisResult = aiResponse.data.prediction;
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
