import asynchHandler from "express-async-handler";
import Blog from "../../models/blogModel.js";

export const getSingleBlog = asynchHandler(async(req,res)=>{
    const {id}=req.params

    const blog = await Blog.findById(id)

    if(!blog){
        throw new Error("blog not found")
    }

    res.status(200).json({
        success: true,
        data: blog,
        message:`blog retrieved ${id} successfully`
    })


})