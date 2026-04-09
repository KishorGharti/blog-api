import blogs from "../models/blogs.models.js";

export const toggleLike = async (req, res) => {
  try {
    const {blogsId} = req.params;

    const blog = await blogs.findById(blogsId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!Array.isArray(blog.likes)) {
      blog.likes = [];
    }
    
    const alreadyLiked = blog.likes.some(
      (id) => id.toString() === userId
    );
    console.log(blog)
    if (alreadyLiked) {
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    res.status(200).json({
      message: alreadyLiked ? "Unliked" : "Liked",
      totalLikes: blog.likes.length
    });

  } catch (err) {
    next(err)
  }
};


export const getLikes = async (req, res) => {
  try {
    const { blogsId } = req.params;

    const blog = await blogs.findById(blogsId);

    res.status(200).json({
      totalLikes: blog.likes.length
    });

  } catch (err) {
    next(err)
  }
};