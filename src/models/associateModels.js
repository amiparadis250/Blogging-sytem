export default function associateModels(models) {
    const { User, Blog, Comment } = models;
  
    User.hasMany(Blog, { foreignKey: 'bloggerId', as: 'blogs' });
    User.hasMany(Comment, { foreignKey: 'commenterId', as: 'comments' });
  
    Blog.belongsTo(User, { foreignKey: 'bloggerId', as: 'blogger' });
    Blog.hasMany(Comment, { foreignKey: 'blogId', as: 'comments' });
  
    Comment.belongsTo(User, { foreignKey: 'commenterId', as: 'commenters' });
    Comment.belongsTo(Blog, { foreignKey: 'blogId' });
  }