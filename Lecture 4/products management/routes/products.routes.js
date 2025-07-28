const productsControllers = require("../controllers/products.controllers");

const express = require("express");

const router = express.Router();

router
    .route("/")
    .get(productsControllers.getALLProducts)
    .post(productsControllers.createProduct);

router
    .route("/:id")
    .get(productsControllers.getProductByID)
    .put(productsControllers.updateProduct)
    .delete(productsControllers.deleteProduct);


module.exports = router;


