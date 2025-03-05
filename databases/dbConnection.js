import mongoose from "mongoose"



export const dbConnection = mongoose.connect("mongodb+srv://graduationProject:EJoiv0swIZa8Ml4r@cluster0.rs75a.mongodb.net/graduationProject").then(() => {
     console.log("databaeConnect");
 })