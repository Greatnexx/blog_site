import asyncHandler from "express-async-handler";
import Blog from "../../models/blogModel.js";


export const getAllBlogs = asyncHandler(async (req,res) => {
  const { sort, page = 1, limit = 10 } = req.query
  // Default page and limit numbers
  const pageNumber =page ? Number(page) : 1;
  const limitNumber = limit ?Number (limit) : 10;
  const skip = (pageNumber - 1) * limitNumber;


  const allowedFilters = ["title", "total_amount", "duration"];

  // Build filters for querying
  const filters = {}; 
  for (const filter of allowedFilters) {
    if (req.body && req.body[filter]) {
      filters[filter] = req.body[filter];
    }
  }

  // Define allowed sorting fields and process sort query
  const allowedSorts= ["id", "title", ];
  const sortOptions = {};


  
  // Handle multi-field sorting
  if (sort) {
    const sortFields = Array.isArray(sort) ? sort : [sort];
    for (const field of sortFields) {
      const [sortField, sortOrder] = field.split(":");
      if (allowedSorts.includes(sortField)) {
        sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;
      }
    }
  }

  // Fetch blogs with pagination and sorting
  const blog = await Blog.find(filters).populate('author', 'username')
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNumber);

  const totalItems = await Blog.countDocuments(filters);

  const totalPages = Math.ceil(totalItems / limitNumber);

  res.status(200).json({
    success: true,
    error: false,
    data: blog,
    pagination: {
      totalItems,
      totalPages,
      currentPage: pageNumber,
    },
    message:"blogs retrived Sucessfully",
  });
});
