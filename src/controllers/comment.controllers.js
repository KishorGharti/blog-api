import blogs from "../models/blogs.models.js";


export const commentController = async (req,res,next)=>{
    try{
        const {blogsId}=req.params;
        const {comment} = req.body;

        const blog = await blogs.findById(blogsId);
        if(!blog){
            return res.status(404).json({message:'Blog not found'})
        }
        blog.comments.push({
        user: req.user.userId,
        text: comment
        });
            await blog.save()
            res.status(201).json(blog);
        }

    catch(err){
        next(err)
    }
}


export const editComment = async (req, res, next) => {
  try {
    const { blogsId, commentId } = req.params;
    const { comment } = req.body;

    const blog = await blogs.findById(blogsId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const foundComment = blog.comments.id(commentId);

    if (!foundComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    foundComment.text = comment;

    await blog.save();

    res.status(200).json({ blog });

  } catch (err) {
    next(err)
  }
};


export const deleteComment = async (req, res) => {
  try{
    const { blogsId, commentId } = req.params;

  const blog = await blogs.findById(blogsId);

  if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const foundComment = blog.comments.id(commentId);

    if (!foundComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await foundComment.deleteOne();

  await blog.save();

  res.status(200).json({ message: "Comment deleted" });
}
  catch(err){
    next(err)
  }
};