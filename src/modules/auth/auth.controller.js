import { User } from "../../../databases/models/user.models.js";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


export const signup = catchError(async (req, res, next) => {
    let user = new User(req.body);
    await user.save()
    let token = jwt.sign({userId:user._id , role:user.role} , process.env.JWT_KEY)
    res.json({message:"success" , token})
}
)

export const signin = catchError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ userId: user._id, role: user.role },  process.env.JWT_KEY)
        return res.json({message:"success" , token})
    }

    next(new AppError("not founded email or password" , 401))
})





export const protectedRoutes = catchError( async (req, res, next) => {
    let { token } = req.headers;
    if (!token) return next(new AppError("token not founded", 401))
    let userPayload = {};
    jwt.verify(token,process.env.JWT_KEY, (err, payload) => {
        if (err) return next(new AppError("invalid token", 401))
        userPayload = payload;
    })
  
    // let user = await User.findById(userPayload.userId)
    // if (!user) return next(new AppError("user Not found", 401))
    
    req.user = userPayload;
    console.log("hhhhhhh");
    
    next()

})


export const allowedTo = (...roles)=> {
    return catchError(async (req, res, next) => {
        if (roles.includes(req.user.role))
        {
            console.log("hhhhhhh1");
             return next()
             
        }
       return next(new AppError("not authorized to access this end point" , 401))
    })
}

