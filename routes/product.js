const router = require("express").Router();
const {
  getProducts,
  createProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/product.js");

router.get("/", getProducts);
router.post("/", createProducts);
router.delete("/:_id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
