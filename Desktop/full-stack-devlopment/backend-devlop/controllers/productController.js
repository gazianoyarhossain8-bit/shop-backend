import Product from "../models/productModel.js";

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const image = req.file ? req.file.path.replace(/\\/g, "/")
        : null;
        const newProduct = new Product({
            name,
            price,
            description,
            image
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 4;
      const searchQuery = req.query.search || "";
      const filter = searchQuery
        ? { name: { $regex: searchQuery, $options: "i" } }
        : {};
      const skip = (page - 1) * limit;
  
      const totalProducts = await Product.countDocuments(filter);
  
      const products = await Product.find(filter)
        .skip(skip)
        .limit(limit);
  
      res.status(200).json({
        totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        skip,
        limit,
        products,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
// Get a specific product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }   
};
export { createProduct, getProducts, getProductById };