import { Router } from 'express';
import commentsController from '../controllers/comment_controller';
import { authMiddleware } from "../controllers/auth_controller";

const commentsRouter: Router = Router();

commentsRouter.get("/", commentsController.getAll.bind(commentsController));
commentsRouter.get("/:id", (req, res) => { commentsController.getById(req, res) });
commentsRouter.post("/", authMiddleware, commentsController.createItem.bind(commentsController));
commentsRouter.put("/:id", authMiddleware, (req, res) => { commentsController.updateItemById(req, res) });
commentsRouter.delete("/:id", authMiddleware, (req, res) => { commentsController.deleteItemById(req, res) });

export default commentsRouter;