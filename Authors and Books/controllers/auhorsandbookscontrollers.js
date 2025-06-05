
const { Author, Book } = require("../models");

const getAllAuthorsWithBooks = async (req, res) => {
  try {

        const { page, limit } = req.body;

        const pagenum = parseInt(page) || 1;
        const limitnum = parseInt(limit) || 5;

        const offset = (pagenum - 1) * limitnum

        const authors = await Author.findAll({
          where: { is_deleted: false },
          offset: offset,
          limit: limitnum,
          include: [
            {
              model: Book,
              as: "Books",
            },
          ],
        });

        return res.status(200).json({
          statuscode: 200,
          status: true,
          message: "Authors fetched successfully",
          Authors: {
            data: authors,
          },
        });
  } catch (error) {
      return res.status(500).json({
        statuscode: 500,
        status: false,
        message: error.message,
      });
  }
};

const getAllBooksWithAuthors = async (req, res) => {
  try {

        const { page, limit } = req.body;

        const pagenum = parseInt(page) || 1;
        const limitnum = parseInt(limit) || 5;

        const offset = (pagenum - 1) * limitnum

        const Books = await Book.findAll({
          where: { is_deleted: false },
          offset: offset,
          limit: limitnum,
          include: [
            {
              model: Author,
              as: "Author",
            },
          ],
        });

        return res.status(200).json({
          statuscode: 200,
          status: true,
          message: "Authors fetched successfully",
          Authors: {
            data: Books,
          },
        });
  } catch (error) {
      return res.status(500).json({
        statuscode: 500,
        status: false,
        message: error.message,
      });
  }
};


const getAllAuthorsbyid = async (req, res) => {
  try {

        const { page, limit } = req.body;

        const pagenum = parseInt(page) || 1;
        const limitnum = parseInt(limit) || 5;

        const offset = (pagenum - 1) * limitnum

        const authors = await Author.findOne({
          where: { id: req.params.id, is_deleted: false },
          offset: offset,
          limit: limitnum,
          include: [
            {
              model: Book,
              as: "Books",
            },
          ],
        });

        return res.status(200).json({
          statuscode: 200,
          status: true,
          message: "Authors fetched successfully",
          Authors: {
            data: authors,
          },
        });
  } catch (error) {
        return res.status(500).json({
          statuscode: 500,
          status: false,
          message: error.message,
        });
  }
};

const getAllBooksbyid = async (req, res) => {
  try {

        const { page, limit } = req.body;

        const pagenum = parseInt(page) || 1;
        const limitnum = parseInt(limit) || 5;

        const offset = (pagenum - 1) * limitnum

        const Books = await Book.findOne({
          where: { id: req.params.id, is_deleted: false },
          offset: offset,
          limit: limitnum,
          include: [
            {
              model: Author,
              as: "Author",
            },
          ],
        });

        return res.status(200).json({
          statuscode: 200,
          status: true,
          message: "Authors fetched successfully",
          Authors: {
            data: Books,
          },
        });
  } catch (error) {
        return res.status(500).json({
          statuscode: 500,
          status: false,
          message: error.message,
        });
  }
};

const CreateAuthor = async (req, res) => {
  const {name , email, phone, age, address}  = req.body;
  const newauthor = await Author.create({name , email, phone, age, address});
   res.status(201).json({
            statuscode: 201,
            status: true,
            message: "Author Created successfully",
            data: newauthor,
        })

}



module.exports = {
  getAllAuthorsWithBooks,
  getAllBooksWithAuthors,
  getAllAuthorsbyid,
  getAllBooksbyid,
  CreateAuthor,
};
