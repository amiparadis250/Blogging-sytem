import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import User from './user.model.js';

dotenv.config();

const sequelize = new Sequelize(process.env.DEV_DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  bloggerId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
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
  tableName: 'blogs',
});



export default Blog;
