'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      commenter: {
        type: Sequelize.STRING,
        allowNull: false
      },
      commenterId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      blogId: {
        type: Sequelize.UUID,
        references: {
          model: 'blogs',
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments');
  }
};