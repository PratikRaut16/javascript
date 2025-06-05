const express = require("express");
const router = express.Router();

const  {
    getAllStudents,
    getstudentbyid,
    createstudent,
    Updatestudent,
    deletestudent,
    searchstudent,
} = require("../controllers/Studentcontroller");

const {
    createStudent,
    updateStudent
    
} = require("../validators/studentvalidators")

const validaterequest =  require("../middlewares/validateRequest")




router.get("/" , getAllStudents);

router.get("/:id" , getstudentbyid);

router.get("/search" , searchstudent);

router.post("/create-student", createStudent , validaterequest , createstudent);

router.post("/update-student", updateStudent , validaterequest , Updatestudent);

router.post("/delete-student" , deletestudent);


module.exports = router;