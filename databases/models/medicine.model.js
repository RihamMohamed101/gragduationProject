import { model, Schema, Types } from "mongoose";




const schema = new Schema({
     
    
  name: String,
  dosage: String,
  
  schedule: String,
  type: String,
  startDate: Date,
  endDate: Date,
  
  prescribedTo: {
    type: Types.ObjectId,
    ref: 'User', // المريض
    required: true
    }
  
})


export const Medicine = model('Medicine' , schema) 