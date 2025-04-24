import { User } from "../../../databases/models/user.models.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";





export const addDoctor = catchError(async(req, res, next) => {
    
    const { name, password} = req.body;
    let doctor = new User({
        name,
        password,
        role: "doctor"
    })

    await doctor.save()

     res.status(201).json({ message: "doctor created successfully", doctor});
})


// export const updateDoctor = catchError(async (req, res, next) => {

//     const doctor = await User.findById(req.params.id);


//     if (!doctor || doctor.role !== "doctor") {
//         return next(new AppError("doctor not found", 404));
//     }
//     const updatedDoctor = await User.findByIdAndUpdate(
//         doctor._id,
//         req.body,
//         { new: true}
//     );
    

    

//     res.status(200).json({message: "doctor updated successfully"} , updatedDoctor);
// })

// export const deleteDoctor = catchError(async (req, res, next) => {

//     const doctor = await User.findById(req.params.id);
   
    
//     if (!doctor || doctor.role !== "doctor") {
//         return next(new AppError("doctor not found", 404));
//     }
//     await User.findByIdAndDelete(doctor._id);

//     res.status(200).json({
//         message: "doctor deleted successfully"
//     });
// });


// export const allDoctors = catchError(async(req , res , next) => {
//      const doctors = await User.find({ role: "doctor"});
//     res.status(200).json({ message: "success", doctors });
// })


// export const getDoctor = catchError(async(req ,res ,next) => {
//      let doctor = await User.findById(req.params.id)
//         return doctor ? res.status(200).json({ message: "success", doctor })
//                       : next(new AppError("User not founded" , 404))
// })