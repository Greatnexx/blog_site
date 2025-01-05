import asyncHandler from 'express-async-handler'
import validator from '../../services/validationService.js'
import { ErrorCode } from '../../utils/Error/Error.js'
import Blog from '../../models/blogModel.js'

export const createBlog = asyncHandler(async(req,res)=>{

    const validation = await validator.validateObject({
        title:"string|required",
        content:"string|required"
    },{...req.body})

    if(validation.error){
        res.status(403).json(validation)
        return;
    }

    const {title, content} =req.body;
    const user_id =req?.user?._id

if(!user_id) {
    throw new Error(ErrorCode.UNAUTHORIZED);
}


const blog = await Blog.create({
    title,
    content,
    author: req.user._id,
    user_id
    
})

res.status(201).json({
    succes:true,
    data:blog,
    message: 'Blog created successfully'
})



})