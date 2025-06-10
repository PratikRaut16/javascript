const express = require("express");
const router = express.Router();
const {

    getAllCategoriesWithProducts,
    getAllProductswithCategories,
    getcategorybyid,
    getproductbyid,
    createCategoryWithProducts,
    createProduct,
    UpdateCategory,
    UpdateProduct,
    DeleteCategory,
    DeleteProduct,

} = require("../controllers/categoryandproduct");

const {

    validateCreateCategoryWithProducts,
    validateCreateProduct,
    validateUpdateCategory,
    validateUpdateProduct

} = require("../validations/categoryandproductvald");

const validaterequest = require("../middlewares/validaterequest");

router.get("/categories-with-products", getAllCategoriesWithProducts);

router.get("/products-with-categories" , getAllProductswithCategories)

router.get("/categories-with-products-byid/:id", getcategorybyid);

router.get("/products-with-categories-byid/:id" , getproductbyid);

router.post("/create-category-with-product" , validateCreateCategoryWithProducts , validaterequest , createCategoryWithProducts);

router.post("/create-product" , validateCreateProduct , validaterequest , createProduct);

router.post("/update-category" , validateUpdateCategory , validaterequest , UpdateCategory);

router.post("/update-product" , validateUpdateProduct , validaterequest, UpdateProduct);

router.post("/delete-category" , DeleteCategory);

router.post("/delete-product" , DeleteProduct);

module.exports = router;

