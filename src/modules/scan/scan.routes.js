import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addScan, deletedScan, updateScan } from "./scan.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { analyzeScan } from "../../middleware/scanAiModel.js";



const scanRouter = Router()

scanRouter.post('/', protectedRoutes, allowedTo('Radiologist'),
    uploadSingleFile("scan", "scans"), addScan, analyzeScan)
    

scanRouter.put('/:id', protectedRoutes, allowedTo('doctor'), updateScan)

scanRouter.delete('/:id' , protectedRoutes , allowedTo('doctor') ,deletedScan)

export default scanRouter