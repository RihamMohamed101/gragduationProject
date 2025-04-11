import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addScan } from "./scan.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";



const scanRouter = Router()

scanRouter.post('/', protectedRoutes, allowedTo('assistant', 'patient'),
    uploadSingleFile("scan", "scans"), addScan)


export default scanRouter