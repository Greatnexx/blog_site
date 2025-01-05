import express from 'express';
import  cors from 'cors';
import UserRoutes from "./routes/userRoutes.js"
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import blogRoutes  from './routes/blogRoutes.js';

const app = express();

// Middleware to parse JSON requests

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use("/test", async(req, res) => {
    res.send("Hello from server")
})


app.use("/api/blog",UserRoutes)
app.use("/api/blog",blogRoutes)

app.use(notFound)
app.use(errorHandler)

export default app;


