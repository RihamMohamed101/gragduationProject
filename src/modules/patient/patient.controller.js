import { Medicine } from "../../../databases/models/medicine.model.js";
import { Scan } from "../../../databases/models/scan.model.js";
import { User } from "../../../databases/models/user.models.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";



export const getPatient = catchError(async (req, res, next) => {
    
    let patient = await User.findById(req.params.id)
    const scan = await Scan.find({ uploadedTo: patient._id });
    const medicines = await Medicine.find({ prescribedTo: patient._id });

    let final = {
        ...patient.toObject(),
         scan: scan || [],
        medicines: medicines || [],
   }

    return patient ? res.status(200).json({ message: "success", patient: final })
                 : next(new AppError("User not founded", 404))
})


export const getMyPatients = catchError(async (req, res, next) => {

    let filterObj = {};
    filterObj.role = "patient" 
    
    filterObj.doctorId = req.user.userId
    
    const patients = await User.find(filterObj)

    const patientsWithRadiology = await Promise.all(
        patients.map(async (patient) => {
            const scan = await Scan.find({ uploadedTo: patient._id });
            const medicines = await Medicine.find({ prescribedTo: patient._id });
            return {
                 ...patient.toObject(),
                 scan: scan || [],
                 medicines: medicines || [],
            };
        })
    );

    res.status(200).json({ message: "success", patients: patientsWithRadiology });
});


export const addPatient = catchError(async (req, res, next) => {

    let doctor = await User.findOne({ code: req.body.code , role:"doctor" })
    if (!doctor)
         return next(new AppError("code not found", 409))
            

 
    const {name,password,age } = req.body;
    
     const newPatient = new User({
        name,
        password,
        age,
        role: "patient",
        doctorId:doctor._id
    });
 
     await newPatient.save();

    res.status(201).json({ message: "Patient created successfully", patient: newPatient });
})
 



export const updatePatientByDoctor = catchError(async (req, res, next) => {


    if (req.body.code) {
    let doctor = await User.findOne({ code: req.body.code , role:"doctor" })
    if (!doctor)
         return next(new AppError("code not found", 409))
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





