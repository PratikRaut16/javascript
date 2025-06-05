const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize , DataTypes) => {
    const Student = sequelize.define("Student" , {

        id : {
             type: DataTypes.INTEGER,    
             autoIncrement: true,
             primaryKey: true,
        } ,

        firstName : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty: true
            }
        } ,

        lastName : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty: true
            }
        } ,  

        age : {
            type : DataTypes.INTEGER,
            allowNull : false ,
            validate : {
                notEmpty : false
            }
        },

        department : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },

        is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue : false
      },


    });

    return Student;
};