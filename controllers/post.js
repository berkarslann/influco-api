

const Influencer = require('../models/influencer')
const Post = require('../models/post');


// @desc      Post post 
// @route     POST /post/
exports.createPost = async(req,res,next)=>{

    try{
        req.body.influencer = req.userId; //influencer
        const {title, description } = req.body;

        const post = new Post({
            influencer: req.body.influencer,
            title: title,
            description: description,

          
        })
        const savedPost =  await post.save();

        const influencer = await Influencer.findById(req.body.influencerId)
 

        influencer.posts.push(savedPost);
        await influencer.save()

        res.status(201).json({
            message: 'Post created successfully!'
        })

    }
    catch(err){
        console.log(err);
        next(err);
    }
}

// @desc      Delete post 
// @route     DELETE /post/:id
exports.deletePost = async(req,res,next)=>{

    try{
        
        const postId = req.params.id;
        const post = await Post.findById(req.params.id);
   
        if (!post) {
            return next(
                res.status(401).json({ success: false, message: "Post bulunamadı" })
            );
          }
    
    const result = await Post.findByIdAndRemove(postId);
    const influencer = await Influencer.findById(req.userId);
    influencer.posts.pull(postId);
    await influencer.save();

    res.status(200).json({ message: 'Deleted post.' }); 
    
  
    }
    catch(err){
        next(err);
    }
   



}