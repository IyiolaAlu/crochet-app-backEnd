const express = require("express");
const {
  getProducts,
  getSingleProducts,
  createProduct,
  deleteProduct,
  updateProducts,
} = require("../controllers/productControllers");
const { validateProduct } = require("../middleware/validation");
const isAdmin = require("../middleware/adminMiddleware");
const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getSingleProducts);

router.post("/",isAdmin, validateProduct, createProduct);

router.delete("/:id",isAdmin, deleteProduct);

router.put("/:id", isAdmin, validateProduct, updateProducts);

module.exports = router;
