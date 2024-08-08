import express from 'express';
import userRoutes from "./routes/user.routes";
import blogRoutes from "./routes/blog.routes";
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from "body-parser";
import User from './models/user.model.js';
import Blog from './models/blog.model.js';
import Comment from './models/comments.model.js';
import associateModels from './models/associateModels.js';


const app = express();
const models = { User, Blog, Comment };
associateModels(models);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.get('/',(req,res)=>{
return res.status(200).json({message:"welcome to  QT APIs"})
})
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);


export default app;
