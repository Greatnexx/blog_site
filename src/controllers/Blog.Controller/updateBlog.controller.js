
import asyncHandler from "express-async-handler";
import Blog from "../../models/blogModel.js";

export const updatedBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user_id = req?.user?._id;

  const allowedUpdates = ["title", "contents"];

  // Verify the body is not empty
  if (!Object.keys(req?.body).length) {
    res.status(400);
    throw new Error("Request body is empty");
  }

  // Prevent invalid fields
  const data = {};
  for (const key of allowedUpdates) {
    if (req?.body?.hasOwnProperty(key)) {
      data[key] = req.body[key];
    }
  }

  // Check if no valid fields are present in the data object
  if (!Object.keys(data).length) {
    res.status(400);
    throw new Error("No valid fields provided for update");
  }

  // Find the budget
  const blog = await Blog.findById(id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  // Ensure the logged-in user owns the blog
  if (blog.user_id.toString() !== user_id.toString()) {
    res.status(403);
    throw new Error("Unauthorized to update this blog");
  }

  // Update the blog
  const updatedBlog = await Blog.findByIdAndUpdate(id, data, {
    new: true, // Return the updated document
    runValidators: true, // Enforce schema validation
  });

  res.status(200).json({
    success: true,
    data: updatedBlog,
    message: `Blog for ${id} updated successfully`,
  });
});
