

import asynchHandler from "express-async-handler"
import Blog from "../../models/blogModel.js";

export const deleteBlog = asynchHandler(async (req, res) => {
    const { id } = req.params;

    const user_id = req?.user?._id;

    const blog = await Blog.findById(id);

    if (!blog) {
        throw new Error(`blog not found for ID ${id}`);
    }

    
    
    if (blog.user_id.toString() !== user_id.toString()) {
        throw new Error("Unauthorized to delete this blog");
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        data: deletedBlog,
        message: "Blog deleted successfully",
    });
});
