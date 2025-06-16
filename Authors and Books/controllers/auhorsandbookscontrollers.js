
const { message } = require("statuses");
const { Author, Book } = require("../models");
const { where , Op} = require("sequelize");
const { is } = require("type-is");
const status = require("statuses");
const { search } = require("../routes/Authorandbooksroutes");

const getAllAuthorsWithBooks = async (req, res) => {
  try {

        const { page, limit , search=""} = req.query;

        const pagenum = parseInt(page) || 1;
        const limitnum = parseInt(limit) || 5;

        const offset = (pagenum - 1) * limitnum

        const {count , rows: authors} = await Author.findAndCountAll({
          where: { is_deleted: false ,
            ...(search && {
              [Op.or] : [
                {name:    { [Op.like]: `%${search}%`} },
                {email:   { [Op.like]: `%${search}%`} },
                {phone:   { [Op.like]: `%${search}%`} },
                {age:     { [Op.like]: `%${search}%`} },
                {address: { [Op.like]: `%${search}%`} },
                
              ]
            }),
          },
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

        const { page, limit , search = ""} = req.query;

        const pagenum = parseInt(page) || 1;
        const limitnum = parseInt(limit) || 5;

        const offset = (pagenum - 1) * limitnum

        const {count , rows : Books} = await Book.findAndCountAll({
          where: { is_deleted: false ,
            ...(search && {
              [Op.or] : [
                {name:            { [Op.like]: `%${search}%`} },
                {price:           { [Op.like]: `%${search}%`} },
                {pages:           { [Op.like]: `%${search}%`} },
                {publication:     { [Op.like]: `%${search}%`} },
                {genre:           { [Op.like]: `%${search}%`} },
              ]
            })
          },
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
          message: "Books fetched successfully",
          Books: {
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


const getAuthorbyid = async (req, res) => {
  try {

        const { page, limit } = req.query;

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

        if(!authors)
        {
          return res.status(400).json({
            statuscode: 400,
            status: false,
            message: "Author not found with this id",

          })
        }

        return res.status(200).json({
          statuscode: 200,
          status: true,
          message: "Author fetched successfully",
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

const getBookbyid = async (req, res) => {
  try {

        const { page, limit } = req.query;

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

        if(!Books)
        {
          return res.status(400).json({
            statuscode:  400,
            status: false,
            message: "Book not found on this id",
          })
        }

          return res.status(200).json({
          statuscode: 200,
          status: true,
          message: "Book fetched successfully",
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
  try{
        const {authorname , email, phone, age, address}  = req.body;
        const newauthor = await Author.create({authorname , email, phone, age, address});
        res.status(201).json({
                  statuscode: 201,
                  status: true,
                  message: "Author Created successfully",
                  data: newauthor,
              })
      }
      catch(error)
      {
        res.status(500).json({message: error.message});
      }

}

const CreateBook = async (req , res) => {
  try{
      const {author_id , bookname, price, pages, publication, genre} =  req.body
      const newbook = await Book.create({author_id , bookname, price, pages, publication, genre});
      res.status(201).json({
                statuscode: 201,
                status: true,
                message: "Book Created successfully",
                data: newbook,
            })
    }
    catch(error)
    {
      res.status(500).json({message: error.message});
    }

}


const createAuthorWithBooks = async (req, res) => {
  try {
    const { authorname, email, phone, age, address , bookname, price, pages, publication, genre } = req.body;

    const newAuthor = await Author.create({ authorname, email, phone, age, address });

    const createdBooks = await Book.create({author_id: newAuthor.id , bookname, price, pages, publication, genre});

    
    res.status(201).json({
      statuscode: 201,
      status: true,
      message: "Author and books created successfully",
      author: newAuthor,
      books: createdBooks,
    });

  } catch (error) {
    console.error("Error creating author with books:", error);
    res.status(500).json({
      statuscode: 500,
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};



const UpdateAuthor = async (req, res) => {
  try{
        const {authorname , email, phone, age, address}  = req.body;
        const newauthor = await Author.update({authorname , email, phone, age, address} ,
          { where : {id : req.body.id , is_deleted: false}},
         );

         if(newauthor[0] === 0)
         {
            return res.status(400).json({
              statuscode: 400,
              status: false,
              message: "Author not found or already deleted",
            });
         }

         const updatedauthor = await Author.findOne({where : {id : req.body.id , is_deleted: false}});

         return res.status(200).json({
          statuscode: 200,
          status: true,
          message: "Author updated Successfully",
          data : updatedauthor,

         })
        
    }
    catch(error)
    {
      res.status(500).json({message: error.message});
    }
}

const UpdateBook = async (req, res) => {
  try{
        const {author_id , bookname, price, pages, publication, genre}  = req.body;
        const newbook = await Book.update({author_id , bookname, price, pages, publication, genre} ,
          { where : {id : req.body.id , is_deleted: false}},
         );

         if(newbook[0] === 0)
         {
            return res.status(400).json({
              statuscode: 400,
              status: false,
              message: "Book not found or already deleted",
            });
         }

         const updatedbook = await Book.findOne({where : {id : req.body.id , is_deleted: false}});

         return res.status(200).json({
          statuscode: 200,
          status: true,
          message: "Book updated Successfully",
          data : updatedbook,

         })
        
    }
    catch(error)
    {
      res.status(500).json({message: error.message});
    }
}

// Soft deleted
const DeleteAuthor = async(req , res) => {
    try
    {
        const author = await Author.update({ is_deleted : true } , 
            { where : {id : req.body.id }}
        );

        if(author[0] === 0)
        {
            return res.status(404).json({
                statuscode: 404,
                status: false,
                message: "Author not found or already deleted",
            });
        }

        res.status(200).json({ 
            statuscode: 200,
            status: true,
            message : "Author deleted successsfully"
        });
    }
    catch(error)
    {
        res.status(500).json({ message : error.message});
    }

};

// Soft deleted
const DeleteBook = async(req , res) => {
    try
    {
        const book = await Book.update({ is_deleted : true } , 
            { where : {id : req.body.id }}
        );

        if(book[0] === 0)
        {
            return res.status(404).json({
                statuscode: 404,
                status: false,
                message: "Book not found or already deleted",
            });
        }

        res.status(200).json({ 
            statuscode: 200,
            status: true,
            message : "Book deleted successsfully"
        });
    }
    catch(error)
    {
        res.status(500).json({ message : error.message});
    }

};




module.exports = {
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
  createAuthorWithBooks,
};
