const express = require("express");

const router = express.Router();
const {
    getProducts,
    getProduct,
    deleteProduct,
    postProduct,
    updateProduct
  } = require("../controllers/productController");


  router.post("/add", postProduct);
  router.post("/get/:id", getProduct);
  router.post("/getAll", getProducts);
  router.post("/delete/:id", deleteProduct);
  router.post("/update/:id", updateProduct);
  

  module.exports = router;