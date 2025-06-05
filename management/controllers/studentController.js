const { Student } = require('../models');

// 🔹 **Get All Students**
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({ where: { is_deleted: false } });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 **Get Student by ID**
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ where: { id: req.params.id, is_deleted: false } });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 **Create a New Student**
const createStudent = async (req, res) => {
  try {
    const { name, email, age, course } = req.body;
    const newStudent = await Student.create({ name, email, age, course });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 **Update Student by ID**
const updateStudent = async (req, res) => {
  try {
    const { name, email, age, course } = req.body;
    const student = await Student.update(
      { name, email, age, course },
      { where: { id: req.params.id, is_deleted: false } }
    );
    if (student[0] === 0) {
      return res.status(404).json({ message: 'Student not found or already deleted' });
    }
    res.status(200).json({ message: 'Student updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 **Soft Delete Student by ID**
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.update(
      { is_deleted: true },
      { where: { id: req.params.id } }
    );
    if (student[0] === 0) {
      return res.status(404).json({ message: 'Student not found or already deleted' });
    }
    res.status(200).json({ message: 'Student soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 **Restore Student by ID**
const restoreStudent = async (req, res) => {
  try {
    const student = await Student.update(
      { is_deleted: false },
      { where: { id: req.params.id } }
    );
    if (student[0] === 0) {
      return res.status(404).json({ message: 'Student not found or not deleted' });
    }
    res.status(200).json({ message: 'Student restored successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  restoreStudent,
};
