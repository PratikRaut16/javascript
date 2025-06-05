const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/products", controller.getAllProducts);
router.get("/product/:id", controller.getProductById);
router.post("/product", upload.single("imagefile"), controller.addProduct);
router.get("/product/:id/image", controller.getProductImage);
router.put("/product/:id", upload.single("imagefile"), controller.updateProduct);
router.delete("/product/:id", controller.deleteProduct);
router.get("/product/search", controller.searchProduct);

module.exports = router;
