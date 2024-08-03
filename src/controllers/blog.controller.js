import Blog from '../models/blog.model.js';
import User from '../models/user.model.js';
import Comment from '../models/comments.model.js';
import createMulterInstance from '../helpers/multer.js';
import { uploadImage } from '../helpers/cloudinary';


const upload = createMulterInstance('Blog-thumbnails');

export const createBlog = async (req, res) => {
  console.log('Received request to create blog');
  console.log('Request headers:', req.headers);
  
  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.error('Error in file upload:', err);
      return res.status(400).json({ message: 'Error uploading file', error: err.message });
    }

    console.log('File upload successful');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    try {
      const { title, content } = req.body;
      
      if (!title || !content) {
        console.error('Missing title or content');
        return res.status(400).json({ message: 'Title and content are required' });
      }

      const image = req.file ? await uploadImage(req.file.path, 'Blog-thumbnails') : null;
      console.log('Uploaded image URL:', image);

      const bloggerId = req.user?.id;
      console.log('Blogger ID:', bloggerId);

      if (!bloggerId) {
        console.error('No blogger ID found');
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const newBlog = await Blog.create({
        bloggerId,
        title,
        content,
        image
      });
      console.log('New blog created:', newBlog);

      res.status(201).json(newBlog);
    } catch (error) {
      console.error('Error in createBlog:', error);
      res.status(500).json({ message: 'Error creating blog', error: error.message });
    }
  });
};

export const getBlogWithCommentsAndCreator = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findByPk(blogId, {
      include: [
        
        {
          model: Comment,
          as: 'comments',
          include: [
            {
              model: User,
              as: 'commenter',
              attributes: ['id', 'names', 'email']
            }
          ]
        }
      ]
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [

        {
          model: Comment,
          as: 'comments',
          include: [
            {
              model: User,
              as: 'commenter',
              attributes: ['id', 'names', 'email']
            }
          ]
        }
      ]
    });

    res.status(200).json(blogs);
  } catch (error) {
    console.log(error); 
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
};
