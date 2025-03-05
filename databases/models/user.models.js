import { model, Schema, Types } from "mongoose";

import bcrypt from "bcrypt"

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trime: true,
        minLength: [3, 'Name must be at least 3 characters']
    },
    email: {
        type: String, 
        required: true, 
        trim: true,
        unique: true
    },
     password: {
        type: String, 
        required: true, 
        trim:true 
    },
     
    role: {
        type: String, 
        enum: ["admin", "user"], 
        default: "user",
        required:true
    },
    
    passwordChangAt: Date,

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