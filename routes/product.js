import express from 'express';
import upload from '../middleware/multer.middleware.js';
import { createProduct, getProducts,  getProductById, } from '../controllers/productController.js';
import { loginUser,  registerUser,getUserDetails } from '../controllers/authController.js';
import { createOrder, getOrdersByUserId  } from '../controllers/orderController.js';
import auth from '../middleware/authMiddleware.js';
 


const productRouter = express.Router();

// Route to create a new product
productRouter.post('/products', upload.single('image'), createProduct);
// Route to get all products
productRouter.get('/products', getProducts);
// Route to get a specific product by ID
productRouter.get('/products/:id', getProductById);
//auth routes
 productRouter.post('/login', loginUser);
 productRouter.post('/register',  registerUser);
 productRouter.get('/users/:id', getUserDetails);
 //order route
 productRouter.post('/orders',auth, createOrder);
productRouter.get('/orders', auth, getOrdersByUserId);
export default productRouter;