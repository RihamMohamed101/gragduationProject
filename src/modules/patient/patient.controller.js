import { User } from "../../../databases/models/user.models.js";
import { catchError } from "../../middleware/catchError.js";



export const getPatient = catchError(async(req ,res ,next) => {
     let patient = await User.findById(req.params.id)
        return patient ? res.status(200).json({ message: "success", patient })
                    : next(new AppError("User not founded" , 404))
})


export const getMyPatients = catchError(async (req, res, next) => {

    let filterObj = {};
    filterObj.role = "patient" 
    if (req.params.doctorId)
        filterObj.doctorId = req.params.doctorId;
    
    const patients = await User.find(filterObj);

    res.status(200).json({ message: "success", patients });
});


export const addPatient = catchError(async(req , res , next) => {
    const doctor = req.user;
    

    const { name, email, password, age} = req.body;

     const newPatient = new User({
        name,
        email,
        password,
        age,
        role: "patient",
        doctorId: doctor.userId
    });
 
     await newPatient.save();

    res.status(201).json({ message: "Patient created successfully", patient: newPatient });
})
 



export const updatePatientByDoctor = catchError(async (req, res, next) => {

    const patient = await User.findById(req.params.id);
    if (!patient || patient.role !== "patient") {
        return next(new AppError("Patient not found", 404));
    }
    const updatedPatient = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    );

    res.status(200).json({
        message: "Patient updated successfully",
        patient: updatedPatient
    });
});



export const deletePatientByDoctor = catchError(async (req, res, next) => {
    const patient = await User.findById(req.params.id);

    if (!patient || patient.role !== "patient") {
        return next(new AppError("Patient not found", 404));
    }
    await User.findByIdAndDelete(patient._id);

    res.status(200).json({
        message: "Patient deleted successfully"
    });
});

