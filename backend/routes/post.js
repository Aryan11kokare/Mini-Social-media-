import { Router } from "express";
import multer from "multer";
import {
  commentPost,
  createPost,
  deletPost,
  getAllPosts,
  incrementLikes,
} from "../controllers/post.js";
import { auth } from "../middelware.js";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

router.post("/post", auth, upload.single("media"), createPost);
router.get("/posts", auth, getAllPosts);
router.delete("/post/:id", auth, deletPost);
router.put("/post/like/:id", auth, incrementLikes);
router.post("/post/comment/:id", auth, commentPost);

export default router;
