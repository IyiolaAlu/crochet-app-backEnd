const Product = require("../models/productModel");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

exports.getProducts = async (req, res, next) => {
  try {
    const product = await Product.find();

    res.status(200).json(product);
  } catch (error) {
    next(error)
  }
};

exports.getSingleProducts = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    next(error)
  }
};

exports.createProduct = async (req, res, next) => {
  const { image, name, price, quantity, description } = req.body;
  let imageUrl = "";

  if (image) {
    const uploadResult = await cloudinary.uploader.upload(image, {
      resource_type: "image",
    });
    imageUrl = uploadResult.secure_url;
  }

  try {
    const product = await Product.create({
      image: imageUrl,
      name,
      price,
      quantity,
      description,
    });
    res.status(200).json(product);
  } catch (error) {
    next(error)
  }
};

exports.deleteProduct = async (req, res, next) => {
  const id = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error)
  }
};

exports.updateProducts = async (req, res, next) => {
  const id = req.params.id;
  const { image, name, price, quantity, description } = req.body;

  let imageUrl = "";

  if (image) {
    const uploadResult = await cloudinary.uploader.upload(image, {
      resource_type: "image",
    });
    imageUrl = uploadResult.secure_url;
  }
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { image: imageUrl, name, price, quantity, description },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error)
  }
};
