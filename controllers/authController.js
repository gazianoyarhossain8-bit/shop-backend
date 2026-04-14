import Auth from "../models/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Auth({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Login user
const loginUser = async(req, res) => {
    try {
      const {email, password} = req.body;
      const auth = await Auth.findOne({email});
  
      if( !auth) {
          return res.status(400).json({
              message: "invalid credentials"});
      }
  
      const isMatch = await
      bcrypt.compare(password, auth.password);
          if(!isMatch) {
              return res.status(400).json({
                  message: "invalid password"});
          }
  
          const token = jwt.sign(
            { id: auth._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );
  
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,       
            sameSite: "none",    
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
          });
          
          res.status(200).json({
              token,
              user: {
                  _id: auth._id,
                  name: auth.name,
                    email: auth.email
                },
                message: "Login successful"
                
              
          })
    } catch (error) { 
      console.log("login error:", error);  
       res.status(500).json({ message: error.message });
    }
  };
  
  
//get user details
const getUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await Auth.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


export { registerUser, loginUser, getUserDetails };