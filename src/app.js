import express from 'express';
import userRoutes from "./routes/user.routes";
import blogRoutes from "./routes/blog.routes";
import bodyParser from "body-parser";


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
return res.status(200).json({message:"welcome to  QT APIs"})
})
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);


export default app;
