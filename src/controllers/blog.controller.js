import Blog from '../models/blog.model.js';
import User from '../models/user.model.js';
import Comment from '../models/comments.model.js';
import createMulterInstance from '../helpers/multer.js';
import { uploadImage } from '../helpers/cloudinary';
import validateBlog from '../validations/blogs.validations.js';


const upload = createMulterInstance('Blog-thumbnails');

export const createBlog = async (req, res) => {
  
  
  upload.single('image')(req, res, async (err) => {
    if (err) {
     
      return res.status(400).json({ message: 'Error uploading file', error: err.message });
    }

    

    try {
      const { title, content } = req.body;
      
      if (!title || !content) {
      
        return res.status(400).json({ 
          status: 'fail',
          message: 'Title and content are required' });
      }
      if(!req.file){
      
        return res.status(400).json({ 
          status : 'fail',
          message: 'No  Blog image provided' 
        });
      }
      const image = req.file ? await uploadImage(req.file.path, 'Blog-thumbnails') : null;
   
     

      const bloggerId = req.user?.id;
    

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

      res.status(201).json({
        message:"Blog  successfully Created",
        data:{
          newBlog
        }
        

    });
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
          model: User,
          as: 'blogger',
          attributes: ['id', 'names', 'email']
        },
        {
          model: Comment,
          as: 'comments',
          include: [
            {
              model: User,
              as: 'commenters',
              attributes: ['id', 'names', 'email']
            }
          ]
        }
      ]
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({
      message: "Blog fetched successfully",
      data: blog
    });
  } catch (error) {
    console.error('Error in getBlogWithCommentsAndCreator:', error);
    res.status(500).json({ message: 'Error fetching blog', error: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        {
          model: User,
          as: 'blogger',
          attributes: ['id', 'names', 'email']
        },
        {
          model: Comment,
          as: 'comments',
          include: [
            {
              model: User,
              as: 'commenters',
              attributes: ['id', 'names', 'email']
            }
          ]
        }
      ]
    });

    res.status(200).json({
      message: "Blogs fetched successfully",
      data: blogs
    });
  } catch (error) {
    console.error('Error in getAllBlogs:', error);
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
};