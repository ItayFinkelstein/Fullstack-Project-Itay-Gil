import { Router } from 'express';
import { getComments, getCommentByPostId, getCommentByOwnerId, postComment, putComment, deleteComment } from '../controllers/comment';

const commentRouter = Router();

commentRouter.get('/', getComments);
commentRouter.get('/:id', getCommentByPostId);
commentRouter.get('/owner/:id', getCommentByOwnerId);
commentRouter.post('/', postComment);
commentRouter.put('/:id', putComment);
commentRouter.delete('/:id', deleteComment);

export default commentRouter;