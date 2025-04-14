import { model, Schema, Types } from "mongoose";

import bcrypt from "bcrypt"

const schema = new Schema({
   
    name: {
        type: String, required: true, trime: true,
            minLength: [3, 'Name must be at least 3 characters']
    },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true ,trim:true}, 
    role: {
        type: String,
        enum: ['doctor', 'patient', 'admin', 'Radiologist'],
        required: true
    },
  

    doctorId: {
        type: Types.ObjectId,
        ref: 'User',
        required: function () { return this.role === 'patient'; }
    }, // للمريض فقط


    age: {
        type: Number,
        required: function () { return this.role === 'patient'; }
    }, // للمريض فقط

 medications: [{
     name:
     {
         type: String,
         required: true,
         trim: true,
         minlength: 2
     },

     dosage:
     {
         type: String,
         required: true,
         trim: true,
         match: /^[0-9]+(mg|g|ml)?$/
     },


     schedule: { type: String, required: true, trim: true },
    
//      {
//   name: "Paracetamol",
//   dosage: "500mg",
//   schedule: "كل 8 ساعات",
//   type: "tablet"
// }
    
    type: { type: String},
    startDate: { type: Date, default: Date.now },
     endDate: { type: Date, required: false },
    
    }]
    

}, {
    versionKey: false,
    timestamps: {
        updatedAt:false
    }
})

schema.pre('save', function () {
    if(this.password)
    this.password = bcrypt.hashSync(this.password , 8)
})

schema.pre('findOneAndUpdate', function () {
    if(this._update.password)
       this._update.password = bcrypt.hashSync(this._update.password, 8)
})


export const User = model('User' , schema)