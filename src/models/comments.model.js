import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import User from './user.model.js';
import Blog from './blog.model.js';

dotenv.config();

const sequelize = new Sequelize(process.env.DEV_DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  commenter: {
    type: DataTypes.STRING,
    allowNull: false
  },
  commenterId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  blogId: {
    type: DataTypes.UUID,
    references: {
      model: Blog,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: true,
  tableName: 'comments',
});


export default Comment;
