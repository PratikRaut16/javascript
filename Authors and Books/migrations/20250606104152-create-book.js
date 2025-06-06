'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      author_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Authors',  // Must match exactly the Authors table name in DB
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',  // Optional but recommended for referential integrity
      },

      bookname: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      pages: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      publication: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      genre: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Books');
  },
};
