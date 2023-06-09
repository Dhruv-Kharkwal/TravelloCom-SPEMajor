import Post from "../models/Post.js";
import User from "../models/User.js";
import { logger } from "../config/logger.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, location, picturePath } = req.body;
    console.log(req.body);
    const user = await User.findById(userId);
    console.log(user);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    });
    console.log("newPost" + newPost);
    const currPost = await newPost.save();

    const post = await Post.find();
    //console.log("Post" + post);
    logger.info(`New Post created by user.`);
    res.status(201).json(post);
  } catch (err) {
    //logger part
    logger.error(`Error while creating new Post: ${err.message}`);
    res.status(409).json({ message: err.message });
  }
};

/*READ*/
export const getFeedPosts = async (req, res) => {
  try {
    logger.info(`Getting users post feeds.`);

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    //logger part
    logger.error(`Error while getting feed posts ${err.message}`);
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    logger.info(`Getting users own post.`);
    res.status(201).json(post);
  } catch (err) {
    //logger part
    logger.error(`Error while getting users posts ${err.message}`);
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatePost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    logger.info(`Post liked!`);
    res.status(200).json(updatePost);
  } catch (err) {
    logger.error(`Error while post like. ${err.message}`);
    res.status(404).json({ message: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    console.log(comment);

    const post = await Post.findById(id);

    console.log(post);

    post.comments.push(comment);
    await post.save();
    console.log(post);

    // const updatePost = await Post.findByIdAndUpdate(id, {
    //   comments: post.comments,
    // });

    const updatePost = await Post.find();

    logger.info(`Comment added to Post!`);
    res.status(200).json(updatePost);
  } catch (err) {
    logger.error(`Error while adding comment. ${err.message}`);
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findOneAndDelete({ _id: id });

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updatePost = await Post.find();

    logger.info("Post deleted");
    return res.status(200).json(updatePost);
  } catch (err) {
    logger.error(`Error while deleting post. ${err.message}`);
    return res
      .status(500)
      .json({ message: "Error occurred while deleting post" });
  }
};
