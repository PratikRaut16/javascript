const { where, Op } = require("sequelize");
const { Student } = require("../models");
const { removeTicks } = require("sequelize/lib/utils");

const getAllStudents = async (req, res) => {
  try {

    const { page, limit , search = ""} = req.query;

    const pagenum = parseInt(page) || 1;
    const limitnum = parseInt(limit) || 5;

    const offset = (pagenum - 1) * limitnum;

    const { count, rows: students } = await Student.findAndCountAll({
      where: { is_deleted: false ,
        ...(search && {
        [Op.or]: [
          { firstName: { [Op.like]: `%${search}%` } },
          { lastName : { [Op.like]: `%${search}%` } },
          { age: { [Op.like]: `%${search}%` } },
          { department : { [Op.like]: `%${search}%` } },
        ],
      }),
      },
      offset: offset,
      limit: limitnum,
    });

    const totalPages = Math.ceil(count / limitnum);

    return res.status(200).json({
      statuscode: 200,
      status: true,
      message: "Students fetched successfully",
      totalRecords: count,
      totalPages: totalPages,
      currentPage: pagenum,
      pageSize: limitnum,
      data: students,

    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getstudentbyid = async(req , res) => {
        try{
            const student = await Student.findOne({ where : {id : req.params.id , is_deleted : false }});
            if(!student)
            {
                return res.status(404).json({
                    statuscode : 404,
                    status: false,
                    message: "Student not found with this id ",
                });
            }
             res.status(200).json({
                statuscode: 200,
                status : true,
                message : "Student fetch successfully",
                data : student,
             });
        }
        catch(error)
        {
            res.status(500).json({ message : error.message });
        }
};

const createstudent = async(req , res) => {
    try{
        const{firstName , lastName , age , department } = req.body;
        const newstudent = await Student.create({firstName , lastName , age , department});
        res.status(201).json({
            statuscode: 201,
            status: true,
            message: "Student Created successfully",
            data: newstudent,
        })
    }

    catch(error)
    {
        res.status(500).json({ message : error.message });
    }
};

const Updatestudent = async(req , res) => {
    try{
        const{firstName , lastName , age , department } = req.body;
        const newstudent = await Student.update({firstName , lastName , age , department} , 
            {where : { id : req.body.id , is_deleted : false }}
        );

        if(newstudent[0] === 0)
        {
            return res.status(404).json({
                statuscode: 404,
                status: false,
                message: "Student not found or already deleted",
            });
        }

      const updatedStudent = await Student.findOne({
      where: { id: req.body.id , is_deleted : false}
    });

    res.status(200).json({
        statuscode: 200,
        status: true,
        message: "Student Updated Successfully",
        data: updatedStudent,
    });
    }
    catch(error)
    {
        res.status(500).json({message :  error.message});
    }
};

// Soft deleted
const deletestudent = async(req , res) => {
    try
    {
        const student = await Student.update({ is_deleted : true } , 
            { where : {id : req.body.id }}
        );

        if(student[0] === 0)
        {
            return res.status(404).json({
                statuscode: 404,
                status: false,
                message: "Student not found or already deleted",
            });
        }

        res.status(200).json({ 
            statuscode: 200,
            status: true,
            message : "Student deleted successsfully"
        });
    }
    catch(error)
    {
        res.status(500).json({ message : error.message});
    }

};


module.exports = {
    getAllStudents,
    getstudentbyid,
    createstudent,
    Updatestudent,
    deletestudent,
    
};