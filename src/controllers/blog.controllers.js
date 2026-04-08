import blogs from '../models/blogs.models.js'; 
import User from '../models/user.models.js';


export const addBlogs = async (req, res) => {
  try {

    const { title, description } = req.body;

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const newBlogs = new blogs({
      title,
      description,
      user: req.user.userId
    });

    const saveBlog = await newBlogs.save();

    res.status(201).json(saveBlog);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error while creating" });
  }
};
export const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, user } = req.query;

    const query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (user) {
      const foundUser = await User.findOne({ username: user });

      if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
      }

      query.user = foundUser._id;
    }

    const skip = (page - 1) * limit;

    const blogsData = await blogs.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await blogs.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      blogs: blogsData
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

export const updateBlogs = async (req, res, next) => {
  try {
    const { blogsId } = req.params;
    const blog = await blogs.findById(blogsId);
    if (!blog)  return res.status(401).json({message:'blog not found'})
    if (blog.user.toString() !== req.user.userId)
      return res.status(401).json({message:'Not allowed'})
    const { title, description } = req.body;
    if (title !== undefined) blog.title = title;
    if (description !== undefined) blog.description = description;

    const updatedblog= await blog.save();
    res.status(200).json(updatedblog);
  } catch (err) {
    return res.status(500).json({message:'error while updating'})
  }
};


export const deleteblogs = async (req, res, next) => {
  try {
    const { blogsId } = req.params;
    const blog = await blogs.findById(blogsId);
    if (!blog)return res.status(401).json({message:'blog not found'})

    if (blog.user.toString() !== req.user.userId)
       return res.status(401).json({message:'Not allowed'})

    await blog.deleteOne();
    res.status(200).json({ message: 'blog deleted' });
  } catch (err) {
    return res.status(500).json({message:'error while deleting'})
  }
};