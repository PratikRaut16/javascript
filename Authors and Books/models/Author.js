const { FOREIGNKEYS } = require("sequelize/lib/query-types");

module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define("Author", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      
    },

    authorname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    is_deleted: {
      type: DataTypes.BOOLEAN,
    },
  });

  Author.associate = function (models) {
  Author.hasMany(models.Book, {
    foreignKey: "author_id",
    as: "Books", 
  });
};


  return Author;
};



