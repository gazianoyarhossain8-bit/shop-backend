
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';


//create order
const createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product & Quantity required" });
    }

    // product fetch from DB
    const product = await Product.findById(productId);
    const totalPrice = product.price * quantity;

    // New Order
    const newOrder = new Order({
      userId: req.userId,
      productId,
      quantity,
      totalPrice,
      image: product.image, // Store product image in order
    });

    // Save order
    const savedOrder = await newOrder.save();

    // 👉 IMPORTANT: populate product data
    const fullOrder = await Order.findById(savedOrder._id).populate("productId");

    // Send populated order to frontend
    res.status(201).json(fullOrder);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate("productId"); // 👉 product ka full data bhi aayega

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { createOrder, getOrdersByUserId };