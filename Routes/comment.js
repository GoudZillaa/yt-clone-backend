const express = require("express");
const router = express.Router();
const CommentController = require("../Controllers/comment")
const auth = require("../middleware/authentication")


router.post('/comment',auth,CommentController.addComment)
router.get('/comment/:videoId',CommentController.getCommentByVideoId)
router.get('/test-auth', auth, (req, res) => {
    console.log('🧪 Test auth endpoint hit');
    res.json({ message: 'Auth working', user: req.user._id });
});

module.exports = router