import asyncHandler from "express-async-handler";
import validator from "../../services/validationService.js";
import User from "../../models/userModel.js";
import { ErrorCode } from "../../utils/Error/Error.js";
import bcrypt from "bcrypt"


export const createUser = asyncHandler(async(req,res)=>{
    const validation = await validator.validateObject({
        username: "string|required",
        email: "string|required|email",
        password: "string|required|minLength:8",
    },{...req.body})

    if(validation.error){
        res.status(403).json(validation)
        return;
    }

    const {username, email, password} = req.body;
    const userExist = await User.findOne({email})
    if(userExist){
       throw new Error(ErrorCode.USER_ALREADY_EXISTS)
    }

    const hashPassword = await bcrypt.hash(password,10);


    const user = await User.create({
        username,
        email,
        password: hashPassword,
    })

    const savedUser = await user.save();

    if(!savedUser){
        throw new Error(ErrorCode.USER_NOT_SAVED)
    }

    res.status(201).json({
        sucess: true,
        data:{
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
        },
        message: 'User created successfully'

    })
})