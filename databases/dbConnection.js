import mongoose from "mongoose"



// export const dbConnection = mongoose.connect("mongodb+srv://Riham:0ahCUTj7HjinJ8wI@cluster0.rs75a.mongodb.net/graduationProject").then(() => {
//       console.log("databaeConnect");
// })


export const dbConnection = mongoose.connect("mongodb://localhost:27017/AlzahaimerSystem").then(() => {
      console.log("databaeConnect");
})
