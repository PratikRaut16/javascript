module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Authors", // Table name in DB
        key: "id",
      },
    },

    bookname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    publication: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    is_deleted: {
      type: DataTypes.BOOLEAN,
    },
  });

  Book.associate = function (models) {
  Book.belongsTo(models.Author, {
    foreignKey: "author_id",
    as: "Author",
  });
};


  return Book;
};
