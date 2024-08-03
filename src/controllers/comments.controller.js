import Comment from '../models/comments.model.js';
import User from '../models/user.model.js';

export const createComment = async (req, res) => {
  try {
    const { blogId, content } = req.body;
    const commenterId = req.user.id; 

    const user = await User.findByPk(commenterId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newComment = await Comment.create({
      content,
      commenterId,
      blogId
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment', error: error.message });
  }
};