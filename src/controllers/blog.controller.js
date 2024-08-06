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
// export const getBlogWithCommentsAndCreator = async (req, res) => {
//   try {
//     const { blogId } = req.params;

//     const blog = await Blog.findByPk(blogId, {
//       include: [
//         {
//           model: User,
//           as: 'blogger',
//           attributes: ['id', 'names', 'email']
//         },
//         {
//           model: Comment,
//           as: 'comments',
//           include: [
//             {
//               model: User,
//               as: 'commenter',
//               attributes: ['id', 'names', 'email']
//             }
//           ]
//         }
//       ]
//     });

//     if (!blog) {
//       return res.status(404).json({ message: 'Blog not found' });
//     }

//     res.status(200).json({
//       message: "Blog fetched successfully",
//       data: blog
//     });
//   } catch (error) {
//     console.error('Error in getBlogWithCommentsAndCreator:', error);
//     res.status(500).json({ message: 'Error fetching blog', error: error.message });
//   }
// };
export const getBlogWithCommentsAndCreator = async (req, res) => {
  try {
    const { blogId } = req.params;

    // Fetch the blog
    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Fetch the blogger
    const blogger = await User.findByPk(blog.bloggerId, {
      attributes: ['id', 'names', 'email']
    });

    // Fetch the comments
    const comments = await Comment.findAll({
      where: { blogId: blog.id }
    });

    // Fetch the commenters
    const commenterIds = [...new Set(comments.map(comment => comment.commenterId))];
    const commenters = await User.findAll({
      where: { id: commenterIds },
      attributes: ['id', 'names', 'email']
    });

    // Create a map of commenter id to commenter data
    const commenterMap = commenters.reduce((map, commenter) => {
      map[commenter.id] = commenter;
      return map;
    }, {});

    // Add commenter data to each comment
    const commentsWithUser = comments.map(comment => ({
      ...comment.toJSON(),
      commenter: commenterMap[comment.commenterId]
    }));

    // Combine all data
    const blogData = {
      ...blog.toJSON(),
      blogger,
      comments: commentsWithUser
    };

    res.status(200).json({
      message: "Blog fetched successfully",
      data: blogData
    });
  } catch (error) {
    console.error('Error in getBlogWithCommentsAndCreator:', error);
    res.status(500).json({ message: 'Error fetching blog', error: error.message });
  }
};

// export const getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.findAll({
//       include: [

//         {
//           model: Comment,
//           as: 'comments',
//           include: [
//             {
              
//               model: User,
//               as: 'commenter',
//               attributes: ['id', 'names', 'email']
//             }
//           ]
//         }
//       ]
//     });

//     res.status(200).json(blogs);
//   } catch (error) {
//     console.log(error); 
//     res.status(500).json({ message: 'Error fetching blogs', error: error.message });
//   }
// };
export const getAllBlogs = async (req, res) => {
  try {
    // Fetch all blogs
    const blogs = await Blog.findAll();

    // Collect all blogger IDs and blog IDs
    const bloggerIds = [...new Set(blogs.map(blog => blog.bloggerId))];
    const blogIds = blogs.map(blog => blog.id);

    // Fetch all bloggers
    const bloggers = await User.findAll({
      where: { id: bloggerIds },
      attributes: ['id', 'names', 'email']
    });

    // Create a map of blogger id to blogger data
    const bloggerMap = bloggers.reduce((map, blogger) => {
      map[blogger.id] = blogger;
      return map;
    }, {});

    // Fetch all comments for all blogs
    const comments = await Comment.findAll({
      where: { blogId: blogIds }
    });

    // Collect all commenter IDs
    const commenterIds = [...new Set(comments.map(comment => comment.commenterId))];

    // Fetch all commenters
    const commenters = await User.findAll({
      where: { id: commenterIds },
      attributes: ['id', 'names', 'email']
    });

    // Create a map of commenter id to commenter data
    const commenterMap = commenters.reduce((map, commenter) => {
      map[commenter.id] = commenter;
      return map;
    }, {});

    // Group comments by blog ID
    const commentsByBlogId = comments.reduce((map, comment) => {
      if (!map[comment.blogId]) {
        map[comment.blogId] = [];
      }
      map[comment.blogId].push({
        ...comment.toJSON(),
        commenter: commenterMap[comment.commenterId]
      });
      return map;
    }, {});

    // Combine all data
    const blogsWithData = blogs.map(blog => ({
      ...blog.toJSON(),
      blogger: bloggerMap[blog.bloggerId],
      comments: commentsByBlogId[blog.id] || []
    }));

    res.status(200).json({
      message: "Blogs fetched successfully",
      data: blogsWithData
    });
  } catch (error) {
    console.error('Error in getAllBlogs:', error);
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
};