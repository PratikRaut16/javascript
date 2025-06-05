'use strict';
const { Model, Sequelize, DataTypes } = require("sequelize");
module.exports = (sequelize , DataTypes)=> {

    Product.init({
        name : {
            type : DataTypes.STRING
            
        }
    })
};