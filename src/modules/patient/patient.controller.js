import { User } from "../../../databases/models/user.models.js";
import { catchError } from "../../middleware/catchError.js";



export const getPatient = catchError(async(req ,res ,next) => {
     let patient = await User.findById(req.params.id)
        return patient ? res.status(200).json({ message: "success", patient })
                    : next(new AppError("User not founded" , 404))
})


export const getMyPatients = catchError(async (req, res, next) => {
    const patients = await User.find({ role: "patient", doctorId: req.user.userId });
    res.status(200).json({ message: "success", patients });
});


export const addPatient = catchError(async(req , res , next) => {
    const doctor = req.user;
    
    if (doctor.role !== "doctor") {
        return next(new AppError("Only doctors can add patients", 403));
    }
    

    const { name, email, password, age, assistantId } = req.body;

   
    let assistant = null;

    if (assistantId) {
        assistant = await User.findById(assistantId);
        if (!assistant || assistant.role !== "assistant") {
            return next(new AppError("Invalid assistant ID", 400));
        }
    }
    

     const newPatient = new User({
        name,
        email,
        password,
        age,
        role: "patient",
        doctorId: doctor.userId,
        assistantId: assistant?._id // دي هنا ان الدكتور بيضيف مساعد للمريض 
    });
 
     await newPatient.save();

    res.status(201).json({ message: "Patient created successfully", patient: newPatient });
})
 



export const updatePatientByDoctor = catchError(async (req, res, next) => {
    const doctor = req.user;

    if (doctor.role !== "doctor") {
        return next(new AppError("Only doctors can update patients", 403));
    }

    const patient = await User.findById(req.params.id);

    if (!patient || patient.role !== "patient") {
        return next(new AppError("Patient not found", 404));
    }

    if (patient.doctorId?.toString() !== doctor.userId) {
        return next(new AppError("You do not have permission to update this patient", 403));
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
    const doctor = req.user;

    if (doctor.role !== "doctor") {
        return next(new AppError("Only doctors can delete patients", 403));
    }

    const patient = await User.findById(req.params.id);

    if (!patient || patient.role !== "patient") {
        return next(new AppError("Patient not found", 404));
    }

    if (patient.doctorId?.toString() !== doctor.userId) {
        return next(new AppError("You do not have permission to delete this patient", 403));
    }

    await User.findByIdAndDelete(patient._id);

    res.status(200).json({
        message: "Patient deleted successfully"
    });
});

