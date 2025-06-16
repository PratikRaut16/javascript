const express = require("express");
const router = express.Router();

const {
    getAllStudents,
    getstudentbyid,
    createstudent,
    Updatestudent,
    deletestudent,
} = require("../controllers/Studentcontroller");

const {
    createStudent,
    updateStudent
} = require("../validators/studentvalidators")

const validaterequest = require("../middlewares/validateRequest");

/**
 * @swagger
 * tags:
 *   name: Student Management API
 *   description: API endpoints for managing students
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get list of students with pagination and search
 *     tags: [Student Management API]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of records per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword for firstName, lastName, age, department
 *     responses:
 *       200:
 *         description: List of students fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllStudents);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Student Management API]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student fetched successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getstudentbyid);

/**
 * @swagger
 * /create-student:
 *   post:
 *     summary: Create a new student
 *     tags: [Student Management API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - age
 *               - department
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               age:
 *                 type: integer
 *               department:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/create-student", createStudent, validaterequest, createstudent);

/**
 * @swagger
 * /update-student:
 *   post:
 *     summary: Update an existing student
 *     tags: [Student Management API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               age:
 *                 type: integer
 *               department:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       404:
 *         description: Student not found or already deleted
 *       500:
 *         description: Internal server error
 */
router.post("/update-student", updateStudent, validaterequest, Updatestudent);

/**
 * @swagger
 * /delete-student:
 *   post:
 *     summary: Soft delete student by ID
 *     tags: [Student Management API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found or already deleted
 *       500:
 *         description: Internal server error
 */
router.post("/delete-student", deletestudent);

module.exports = router;
