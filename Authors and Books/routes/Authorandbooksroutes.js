const express = require("express");
const router = express.Router();

const {
    getAllAuthorsWithBooks,
    getAllBooksWithAuthors,
    getAllAuthorsbyid,
    getAllBooksbyid,
    CreateAuthor
} = require("../controllers/auhorsandbookscontrollers");

const {
    createauthor,
    updateauthor,
} = require("../validators/authorValidator")

const validaterequest = require("../middlewares/validateRequest")

router.get("/Authors" , getAllAuthorsWithBooks);

router.get("/Books" , getAllBooksWithAuthors);

router.get("/Author/:id", getAllAuthorsbyid);

router.get("/Books/:id", getAllBooksbyid);

router.post("/Author/create-author" , createauthor , validaterequest ,CreateAuthor );



module.exports = router;