const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  restoreStudent,
} = require('../controllers/studentController');

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Retrieve all students
 *     responses:
 *       200:
 *         description: A list of students.
 */
router.get('/', getAllStudents);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A student object.
 *       404:
 *         description: Student not found
 */
router.get('/:id', getStudentById);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *               course:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created successfully.
 */
router.post('/', createStudent);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *               course:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated successfully.
 */
router.put('/:id', updateStudent);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Soft delete a student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Student soft deleted successfully.
 */
router.delete('/:id', deleteStudent);

/**
 * @swagger
 * /students/restore/{id}:
 *   patch:
 *     summary: Restore a deleted student
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Student restored successfully.
 */
router.patch('/restore/:id', restoreStudent);

module.exports = router;
