const express = require("express");
const router = express.Router();

const {
    getAllAuthorsWithBooks,
    getAllBooksWithAuthors,
    getAuthorbyid,
    getBookbyid,
    // CreateAuthor,
    // CreateBook,
    UpdateAuthor,
    UpdateBook,
    DeleteAuthor,
    DeleteBook,
    createAuthorWithBooks
} = require("../controllers/auhorsandbookscontrollers");

const {
    createauthor,
    updateauthor,
} = require("../validators/authorValidator")

const {
    createbook,
    updatebook,
}  = require("../validators/booksValidators")

const validaterequest = require("../middlewares/validateRequest")

router.get("/Authors" , getAllAuthorsWithBooks);

router.get("/Books" , getAllBooksWithAuthors);

router.get("/Author/:id", getAuthorbyid);

router.get("/Book/:id", getBookbyid);

router.post("/AuthorandBooks/create" , createauthor , createbook , validaterequest, createAuthorWithBooks);

// router.post("/Author/create-author" , createauthor , validaterequest ,CreateAuthor );

// router.post("/Book/create-book" , createbook , validaterequest ,CreateBook );

router.post("/Author/update-author", updateauthor , validaterequest , UpdateAuthor);

router.post("/Book/update-book" , updatebook , validaterequest ,UpdateBook );

router.post("/Author/delete-author" , DeleteAuthor);

router.post("/Book/delete-book" , DeleteBook);





module.exports = router;