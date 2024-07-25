import express, { Request, Response } from 'express';
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
const router = express.Router();

// Configure Multer storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 5MB
  },
});

async function uploadImage(image: Express.Multer.File) {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.uploader.upload(dataURI);
    return res.url;
  }
  
router.post("/", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      // console.log("Uploading image")
      // Upload image to Cloudinary
      const result = await uploadImage(req.file);
      // Return the image URL
      // console.log(result)
      res.status(200).json({ imageUrl: result });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  });


export default router;
