import asyncHandler from "express-async-handler";
import JWT from "jsonwebtoken";

export const genToken = asyncHandler(async (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 24 * 60 * 60,
  });
});
