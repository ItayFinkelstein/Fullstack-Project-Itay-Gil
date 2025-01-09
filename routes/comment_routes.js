const express = require('express');
const commentController = require('../controllers/comment');
const router = express.Router();

router.get('/', commentController.getComments);
router.get('/:id', commentController.getCommentById);

router.post('/', commentController.postComment);

router.put('/:id', commentController.putComment);

router.delete('/:id', commentController.deleteComment);


module.exports = router;