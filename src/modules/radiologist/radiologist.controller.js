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


export const updateRadio = catchError(async (req, res, next) => {

    const radio = await User.findById(req.params.id);
    if (!radio || radio.role !== "radio") {
        return next(new AppError("radio not found", 404));
    }
    const updatedradio = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    );

    res.status(200).json({
        message: "radio updated successfully",
        radio: updatedradio
    });
});


export const deleteRadio = catchError(async (req, res, next) => {

    const radio = await User.findById(req.params.id);

    if (!radio || radio.role !== "radio") {
        return next(new AppError("radio not found", 404));
    }
    await User.findByIdAndDelete(radio._id);

    res.status(200).json({
        message: "radio deleted successfully"
    });
});

