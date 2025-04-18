import jwt from "jsonwebtoken";

const isUserAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log("Token is", token);
    if (!token) {
      return res.status(401).json({ message: "User  is not authenticated" });
    }
    console.log(`process.env.JWT_SECRET_KEY is  ${process.env.JWT_SECRET_KEY}`);

    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode || !decode.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log(`Decoded is  ${decode}`);

    req.id = decode.userId;

    next();
  } catch (error) {
    console.log("Error inside isUserAuthenticated: ", error);
  }
};
export default isUserAuthenticated;
