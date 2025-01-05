import jwt from "jsonwebtoken";
import { ErrorCode } from "../utils/Error/Error.js";
import { getErrorCode } from "../utils/Error/Error.js";

const protect = async (
  req,
  res,
  next
) => {
  let token

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const secretKey = process.env.JWT_SECRET || 'your-secret-key'; // Use your secret key

      // Verify the token
      const user = jwt.verify(token, secretKey);
      req.user = user;

      return next();
    }

    // If no token is found
    res.status(401);
    throw new Error(ErrorCode.TOKEN_EXPIRED);
  } catch (error) {
    res.status(401);
    res.json({
      error: true,
      code: getErrorCode(error.message),
      message: error.message,
    });
  }
};

export { protect };