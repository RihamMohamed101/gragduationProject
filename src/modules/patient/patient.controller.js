import { Medicine } from "../../../databases/models/medicine.model.js";
import { Scan } from "../../../databases/models/scan.model.js";
import { User } from "../../../databases/models/user.models.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";







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
    
    const patients = await User.find(filterObj,("-password -doctorId -role"))

    const patientsWithRadiology = await Promise.all(
        patients.map(async (patient) => {
            const scan = await Scan.find({ uploadedTo: patient._id } , ("-uploadedTo"));
            return {
                 ...patient.toObject(),
                scan: scan || [],
            };
        })
    );

    res.status(200).json({ message: "success", patients: patientsWithRadiology });
});


export const addPatient = catchError(async (req, res, next) => {


    let doctor = req.user

    let doctorId ="";
    if (doctor.role == "admin")
     {
      doctorId  = req.body.doctorId
     }
            
     else if (doctor.role == "doctor")
     {
      doctorId = doctor.userId;
     }
            
     if (doctorId == undefined)
         return next(new AppError("not found doctorId", 401))
 
    const { name, email, password, age } = req.body;
    
     const newPatient = new User({
        name,
        email,
        password,
        age,
        role: "patient",
        doctorId
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


//medicine

export const addMedicine = catchError(async(req , res , next) => {
    
 
  let patient = await User.findById(req.params.id)
    if (!patient || patient.role !== "patient") {
    return next(new AppError("Patient ID is required", 400));
  }

  const { name, dosage, schedule, type, startDate, endDate } = req.body;

  const newMed = await Medicine.create({
    name,
    dosage,
    schedule,
    type,
    startDate,
    endDate,
    prescribedTo: patient._id
  });

  res.status(201).json({
    message: "Medication added successfully",
    medication: newMed
  });
})


export const updateMedicine = catchError(async(req , res , next) => {
    const { patientId, medicineId } = req.params;
    

    let patient = await User.findById(patientId)
    if (!patient || patient.role !== "patient") {
    return next(new AppError("Patient ID is required", 400));
    }


    const medicine = await Medicine.findOneAndUpdate(
        { _id: medicineId, prescribedTo: patientId },
        req.body,
        {new:true}
    )

    if (!medicine) {
    return next(new AppError("Medication not found for this patient", 404));
    }
    

    res.status(200).json({
    message: "Medication updated successfully",
    medication: medicine,
  });
    
})


export const deleteMedicine = catchError(async(req , res , next) => {
    const { patientId, medicineId } = req.params;
    

    let patient = await User.findById(patientId)
    if (!patient || patient.role !== "patient") {
    return next(new AppError("Patient ID is required", 400));
    }


    const medicine = await Medicine.findOneAndDelete(
        { _id: medicineId, prescribedTo: patientId }
    )

    if (!medicine) {
    return next(new AppError("Medication not found for this patient", 404));
    }
    

    res.status(200).json({
    message: "Medication deleted successfully",
    medication: medicine,
  });
    
})
