const express = require("express");
const router = express.Router();

const {
    getAllAuthorsWithBooks,
    getAllBooksWithAuthors,
    getAuthorbyid,
    getBookbyid,
    CreateAuthor,
    CreateBook,
    UpdateAuthor,
    UpdateBook,
    DeleteAuthor,
    DeleteBook,
    createAuthorWithBooks
} = require("../controllers/auhorsandbookscontrollers");

const { createauthor, updateauthor } = require("../validators/authorValidator");
const { createbook, updatebook } = require("../validators/booksValidators");
const validaterequest = require("../middlewares/validateRequest");

/**
 * @swagger
 * tags:
 *   name: AuthorsAndBooks
 *   description: API for managing authors and books
 */

/**
 * @swagger
 * /authors-with-books:
 *   get:
 *     summary: Get all authors along with their books
 *     tags: [AuthorsAndBooks]
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
 *         description: Successfully retrieved all authors with books
 */
router.get("/authors-with-books", getAllAuthorsWithBooks);

/**
 * @swagger
 * /books-with-authors:
 *   get:
 *     summary: Get all books with their authors
 *     tags: [AuthorsAndBooks]
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
 *         description: Successfully retrieved all books with authors
 */
router.get("/books-with-authors", getAllBooksWithAuthors);

/**
 * @swagger
 * /author-by-id/{id}:
 *   get:
 *     summary: Get author with books by ID
 *     tags: [AuthorsAndBooks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Author found
 */
router.get("/author-by-id/:id", getAuthorbyid);

/**
 * @swagger
 * /book-by-id/{id}:
 *   get:
 *     summary: Get book with author by ID
 *     tags: [AuthorsAndBooks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book found
 */
router.get("/book-by-id/:id", getBookbyid);

/**
 * @swagger
 * /create-author-with-book:
 *   post:
 *     summary: Create a new author with books
 *     tags: [AuthorsAndBooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorname
 *               - email
 *               - phone
 *               - age
 *               - address
 *               - bookname
 *               - price
 *               - pages
 *               - publication
 *               - genre
 *             properties:
 *               authorname:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               age:
 *                 type: integer
 *               address:
 *                 type: string
 *               bookname:
 *                 type: string
 *               price:
 *                 type: number
 *               pages:
 *                 type: integer
 *               publication:
 *                 type: string
 *               genre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Author and book created successfully
 */
router.post("/create-author-with-book", createauthor, createbook, validaterequest, createAuthorWithBooks);

/**
 * @swagger
 * /create-author:
 *   post:
 *     summary: Create a new author
 *     tags: [AuthorsAndBooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [authorname, email, phone, age, address]
 *             properties:
 *               authorname:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               age:
 *                 type: integer
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Author created successfully
 */
router.post("/create-author", createauthor, validaterequest, CreateAuthor);

/**
 * @swagger
 * /create-book:
 *   post:
 *     summary: Create a new book
 *     tags: [AuthorsAndBooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [author_id, bookname, price, pages, publication, genre]
 *             properties:
 *               author_id:
 *                 type: integer
 *               bookname:
 *                 type: string
 *               price:
 *                 type: number
 *               pages:
 *                 type: integer
 *               publication:
 *                 type: string
 *               genre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created successfully
 */
router.post("/create-book", createbook, validaterequest, CreateBook);

/**
 * @swagger
 * /update-author:
 *   put:
 *     summary: Update an existing author
 *     tags: [AuthorsAndBooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, authorname, email, phone, age, address]
 *             properties:
 *               id:
 *                 type: integer
 *               authorname:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               age:
 *                 type: integer
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Author updated successfully
 */
router.put("/update-author", updateauthor, validaterequest, UpdateAuthor);

/**
 * @swagger
 * /update-book:
 *   put:
 *     summary: Update an existing book
 *     tags: [AuthorsAndBooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, author_id, bookname, price, pages, publication, genre]
 *             properties:
 *               id:
 *                 type: integer
 *               author_id:
 *                 type: integer
 *               bookname:
 *                 type: string
 *               price:
 *                 type: number
 *               pages:
 *                 type: integer
 *               publication:
 *                 type: string
 *               genre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 */
router.put("/update-book", updatebook, validaterequest, UpdateBook);

/**
 * @swagger
 * /delete-author:
 *   delete:
 *     summary: Delete an author (Soft Delete)
 *     tags: [AuthorsAndBooks]
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
 *         description: Author deleted successfully
 */
router.delete("/delete-author", DeleteAuthor);

/**
 * @swagger
 * /delete-book:
 *   delete:
 *     summary: Delete a book (Soft Delete)
 *     tags: [AuthorsAndBooks]
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
 *         description: Book deleted successfully
 */
router.delete("/delete-book", DeleteBook);

module.exports = router;
