import { Request, Response } from 'express';

const getPosts = (req: Request, res: Response): void => {
    res.send('get all posts')
}

export { getPosts};