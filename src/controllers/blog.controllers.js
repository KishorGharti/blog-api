import blogs from '../models/blogs.models.js'; 


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

export const getBlogs = async (req, res, next) => {
  try {
    const blog = await blogs.find({ user: req.user.userId });
    res.status(200).json(blog);
  } catch (err) {
     return res.status(500).json({message:'error while creating'})
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