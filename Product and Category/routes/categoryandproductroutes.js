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

/**
 * @swagger
 * tags:
 *   name: CategoryProduct
 *   description: API for managing categories and products
 */

/**
 * @swagger
 * /categories-with-products:
 *   get:
 *     summary: Get all categories along with their products
 *     tags: [CategoryProduct]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         default: 5
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved all categories with products
 */
router.get("/categories-with-products", getAllCategoriesWithProducts);

/**
 * @swagger
 * /products-with-categories:
 *   get:
 *     summary: Get all products with their categories
 *     tags: [CategoryProduct]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         default: 5
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved all products with categories
 */
router.get("/products-with-categories", getAllProductswithCategories);

/**
 * @swagger
 * /categories-with-products-byid/{id}:
 *   get:
 *     summary: Get category with products by ID
 *     tags: [CategoryProduct]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category found
 */
router.get("/categories-with-products-byid/{id}", getcategorybyid);

/**
 * @swagger
 * /products-with-categories-byid/{id}:
 *   get:
 *     summary: Get product with category by ID
 *     tags: [CategoryProduct]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product found
 */
router.get("/products-with-categories-byid/{id}", getproductbyid);

/**
 * @swagger
 * /create-category-with-product:
 *   post:
 *     summary: Create a new category with products
 *     tags: [CategoryProduct]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category_name
 *               - products
 *             properties:
 *               category_name:
 *                 type: string
 *               description:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [product_name, price, stock_quantity]
 *                   properties:
 *                     product_name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     stock_quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Category and products created successfully
 */
router.post("/create-category-with-product", validateCreateCategoryWithProducts, validaterequest, createCategoryWithProducts);

/**
 * @swagger
 * /create-product:
 *   post:
 *     summary: Create a new product
 *     tags: [CategoryProduct]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product_name, category_id, price, stock_quantity]
 *             properties:
 *               product_name:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               price:
 *                 type: number
 *               stock_quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post("/create-product", validateCreateProduct, validaterequest, createProduct);

/**
 * @swagger
 * /update-category:
 *   put:
 *     summary: Update an existing category
 *     tags: [CategoryProduct]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id]
 *             properties:
 *               id:
 *                 type: integer
 *               category_name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Category updated successfully
 */
router.put("/update-category", validateUpdateCategory, validaterequest, UpdateCategory);

/**
 * @swagger
 * /update-product:
 *   put:
 *     summary: Update an existing product
 *     tags: [CategoryProduct]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id]
 *             properties:
 *               id:
 *                 type: integer
 *               product_name:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               price:
 *                 type: number
 *               stock_quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put("/update-product", validateUpdateProduct, validaterequest, UpdateProduct);

/**
 * @swagger
 * /delete-category:
 *   delete:
 *     summary: Delete a category (Soft Delete)
 *     tags: [CategoryProduct]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id]
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Category deleted successfully
 */
router.delete("/delete-category", DeleteCategory);

/**
 * @swagger
 * /delete-product:
 *   delete:
 *     summary: Delete a product
 *     tags: [CategoryProduct]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id]
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete("/delete-product", DeleteProduct);

module.exports = router;
