import asyncHandler from "express-async-handler";
import validator from "../../services/validationService.js";
import User from "../../models/userModel.js";
import { ErrorCode } from "../../utils/Error/Error.js";
import generateToken from "../../utils/Tokens/generateToken.js"
import bcrypt from "bcrypt"

export const loginUser = asyncHandler(async(req,res)=>{
    const validation = await validator.validateObject({
        email: "string|required|email",
        password: "string|required|minLength:8",

    },{...req.body})

    if(validation.error){
        res.status(403).json(validation)
        return;
    }

    const {email, password} =req.body;

    const user = await User.findOne({email})
    if(!user){
        throw new Error(ErrorCode.USER_NOT_FOUND)
    }


    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('username or password not correct')
    }

    const accessToken = generateToken(user._id)

    res.status(200).json({
    success: true,
        data: {
            accessToken,
            id: user._id,
            username: user.username,
            email: user.email,
        },
        message: 'User logged in successfully'

    })
})