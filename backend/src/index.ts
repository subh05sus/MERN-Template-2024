import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
import { v2 as cloudinary } from "cloudinary";

// routes
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import uploadRoutes from "./routes/upload";
import path from 'path';





mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING as string)
  .then(() => console.log("MongoDB connected"));

const app = express()
app.use(cookieParser())
const PORT = process.env.PORT || 7000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));

  app.use(express.static(path.join(__dirname, "../../frontend/dist")));


  // routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/upload", uploadRoutes);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`)
})
