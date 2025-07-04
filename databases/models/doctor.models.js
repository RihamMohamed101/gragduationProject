

import { model, Schema} from "mongoose";

import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';

const schema = new Schema({ 
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'Name must be at least 3 characters']
    },

   code: {
      type: String,
      default: () => uuidv4().slice(0, 5), // أول 5 حروف فقط
      unique: true
    },
  
    password: { type: String, required: true, trim: true }, 
   
    role: {
        type: String,
        default:"doctor",
        required: true
    },

    deviceTokens: {
        type: String,
        default: null
      }

}, {
    versionKey: false,
    timestamps: {
        updatedAt:false
    }
})

schema.pre('save', function(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
  });



schema.pre('findOneAndUpdate', function () {
    if(this._update.password)
       this._update.password = bcrypt.hashSync(this._update.password, 8)
})


export const Doctor = model('Doctor' , schema)
