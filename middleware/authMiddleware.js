import e from "express";
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;   // you are using cookies → correct

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;     // <-- THIS WORKS NOW
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
export default auth;