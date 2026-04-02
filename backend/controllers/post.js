import Post from "../models/post.js";

export const createPost = async (req, res) => {
  try {
    const user = req.user;
    const { text } = req.body;

    if (req?.file?.filename) {
      const newPost = new Post({
        text: text,
        image: req.file !== undefined ? req.file.filename : "",
        userId: user._id,
      });
      await newPost.save();
    } else {
      const newPost = new Post({
        text: text,
        userId: user._id,
      });
      await newPost.save();
    }
    res.status(200).json("Post created succefully");
  } catch (e) {
    console.log(e);
  }
};

export const deletPost = async (req, res) => {
  try {
    const user = req.user;
    const postId = req.params.id;
    const findPost = await Post.findById(postId);
    if (!findPost) {
      return res.status(400).json("post not found");
    }

    if (user._id.toString() !== findPost.userId.toString()) {
      return res
        .status(401)
        .json("you dont have permission to delete this post");
    }

    await Post.findByIdAndDelete(postId);
    res.status(200).json("post deleted succefully");
  } catch (e) {
    console.log(e.message);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username")
      .populate("comments.user", "username")
      .sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

export const incrementLikes = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (post.likes.includes(req.user._id)) {
      post.likes = post.likes.filter((id) => id.toString() !== req.user._id);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.status(200).json(post.likes.length);
  } catch {
    res.status(500).send("Server error");
  }
};

export const commentPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    const newComment = {
      user: req.user,
      text: req.body.comment,
    };

    post.comments.push(newComment);
    await post.save();

    res.status(200).json(post.comments);
  } catch {
    res.status(500).send("Server error");
  }
};
