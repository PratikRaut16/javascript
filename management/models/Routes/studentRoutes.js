const { Student, sequelize } = require('../models');

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({ where: { is_deleted: false } });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

const createStudent = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { name, email, age, course } = req.body;
    const newStudent = await Student.create({ name, email, age, course }, { transaction: t });
    await t.commit();
    res.status(201).json(newStudent);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { name, email, age, course } = req.body;
    const [updatedRows] = await Student.update(
      { name, email, age, course },
      { where: { id: req.params.id, is_deleted: false }, transaction: t }
    );
    if (updatedRows === 0) {
      await t.rollback();
      return res.status(404).json({ message: 'Student not found or already deleted' });
    }
    await t.commit();
    res.status(200).json({ message: 'Student updated successfully' });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const [deletedRows] = await Student.update(
      { is_deleted: true },
      { where: { id: req.params.id }, transaction: t }
    );
    if (deletedRows === 0) {
      await t.rollback();
      return res.status(404).json({ message: 'Student not found or already deleted' });
    }
    await t.commit();
    res.status(200).json({ message: 'Student soft deleted successfully' });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};

const restoreStudent = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const [restoredRows] = await Student.update(
      { is_deleted: false },
      { where: { id: req.params.id }, transaction: t }
    );
    if (restoredRows === 0) {
      await t.rollback();
      return res.status(404).json({ message: 'Student not found or not deleted' });
    }
    await t.commit();
    res.status(200).json({ message: 'Student restored successfully' });
  } catch (error) {
    await t.rollback();
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
