import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generateJwt = (id) => {
  const JwtKey = process.env.JWT_KEY;
  const data = {
    email: id,
  };
  const token = jwt.sign(data, JwtKey, { expiresIn: "48h" });
  return token;
};

const verifyJwt = (token) => {
  const JwtKey = process.env.JWT_KEY;
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  return decoded;
};

export { verifyJwt, generateJwt };
