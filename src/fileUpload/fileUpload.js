import multer from "multer"
import { v4 as uuidv4 } from 'uuid';
import { AppError } from "../utils/appError.js";



const  fileUpload = (folderName)=> {
    const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `uploads/${folderName}`)
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + file.originalname)
  }
})


function fileFilter (req, file, cb) {

  if(file.mimetype.startsWith('image'))
    cb(null, true)
  else
   cb(new AppError('images only' , 401) , false)

}



const upload = multer({
    storage, fileFilter, limits: {
        fieldSize: 1 * 1024 * 1024,
    }
})
    
    return upload;
}


export const uploadSingleFile = (fileName , folderName) => {
     return fileUpload(folderName).single(fileName)
}

