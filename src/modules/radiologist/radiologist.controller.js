import { User } from "../../../databases/models/user.models.js";
import { catchError } from "../../middleware/catchError.js";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AppError } from "../../utils/appError.js";




export const RadiologistSignin = catchError(async (req, res, next) => {

    let user = await User.findOne({code: req.body.code,role:"Radiologist"})
   
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY)
        return res.json({ message: "success", token })
    }
    next(new AppError("not founded email or password", 401))
})

export const addRadiologist = catchError(async (req, res, next) => {
    const { name, password } = req.body;
    let radiolo = new User({
        name,
        password,
        role: "Radiologist",
    })

    await radiolo.save()

    res.status(201).json({ message: "Radiologist created successfully", radiolo });
})



