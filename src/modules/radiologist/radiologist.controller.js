import { User } from "../../../databases/models/user.models.js";
import { catchError } from "../../middleware/catchError.js";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"




export const RadiologistSignin = catchError(async (req, res, next) => {

    let user = await User.findOne({ email: req.body.email })
    console.log(user);

    if (user && bcrypt.compareSync(req.body.password, user.password) && (user.role == "Radiologist" || user.role == "admin")) {
        let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY)
        return res.json({ message: "success", token })
    }
    next(new AppError("not founded email or password", 401))
})

export const addRadiologist = catchError(async (req, res, next) => {
    const { name, email, password } = req.body;
    let radiolo = new User({
        name,
        email,
        password,
        role: "Radiologist",
    })

    await radiolo.save()

    res.status(201).json({ message: "Radiologist created successfully", radiolo });
})