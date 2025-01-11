import { Request, Response } from 'express';

const getComments = (req: Request, res: Response): void => {
    if (req.query.id !== undefined) {
        res.send(`find all comments related to ${req.query.id}`);
    } else {
        res.send('get all comments');
    }
}

const getCommentByPostId = (req: Request, res: Response): void => {
    res.send(`get comment of post id : ${req.params.id}`);
}

const getCommentByOwnerId = (req: Request, res: Response): void => {
    res.send(`get comment of owner id : ${req.params.id}`);
}

const postComment = (req: Request, res: Response): void => {
    res.send('post comment : ' + JSON.stringify(req.body));
}

const putComment = (req: Request, res: Response): void => {
    res.send('put comment : ' + JSON.stringify(req.body));
}

const deleteComment = (req: Request, res: Response): void => {
    res.send('delete comment : ' + req.params.id);
}

export { getComments, getCommentByPostId, getCommentByOwnerId, postComment, putComment, deleteComment };