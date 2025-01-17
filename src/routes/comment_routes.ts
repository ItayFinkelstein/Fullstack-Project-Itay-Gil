import { Router } from 'express';
import commentsController from '../controllers/comment';

const commentsRouter: Router = Router();

commentsRouter.get("/", commentsController.getAll.bind(commentsController));
commentsRouter.get("/:id", (req, res) => { commentsController.getById(req, res) });
commentsRouter.post("/", commentsController.createItem.bind(commentsController));
commentsRouter.put("/:id", (req, res) => { commentsController.updateItemById(req, res) });
commentsRouter.delete("/:id", (req, res) => { commentsController.deleteItemById(req, res) });

export default commentsRouter;