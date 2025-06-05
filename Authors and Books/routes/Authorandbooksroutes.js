const express = require("express");
const router = express.Router();

const {
    getAllAuthorsWithBooks,
    getAllBooksWithAuthors,
    getAllAuthorsbyid,
    getAllBooksbyid,
    CreateAuthor,
    CreateBook,
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

router.get("/Author/:id", getAllAuthorsbyid);

router.get("/Book/:id", getAllBooksbyid);

router.post("/Author/create-author" , createauthor , validaterequest ,CreateAuthor );

router.post("/Book/create-book" , createbook , validaterequest ,CreateBook );



module.exports = router;