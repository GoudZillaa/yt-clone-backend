const Comment=require('../Modals/comment')

exports.addComment = async(req,res) =>{
    try{
        let {video,message}=req.body;
        const comment = new Comment({user:req.user._id,video,message})
        await comment.save();
        res.status(201).json({success:"true",comment})
    }catch(error){
        res.status(500).json({error:"server error"})
    }
}
exports.getCommentByVideoId = async(req,res) =>{
    try{
        let {videoId}=req.params;
        const comments = await Comment.find({video:videoId}).populate('user','channelName profilePic userName createdAt');

        res.status(201).json({success:"true",comments})
    }catch(error){
        res.status(500).json({error:"server error"})
    }
}