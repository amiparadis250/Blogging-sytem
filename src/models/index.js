import { Sequelize } from 'sequelize';
import User from './user.model.js';
import Blog from './blog.model.js';
import Comment from './comments.model.js';

const sequelize = new Sequelize(process.env.DEV_DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const models = {
  User: User.init(sequelize),
  Blog: Blog.init(sequelize),
  Comment: Comment.init(sequelize)
};

// Apply associations
Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

export { sequelize, models };
