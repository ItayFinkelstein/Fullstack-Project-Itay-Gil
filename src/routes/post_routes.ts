import { Router } from 'express';
import postsController from '../controllers/post_controller';
import { authMiddleware } from "../controllers/auth_controller";

const router = Router();

router.get('/', postsController.getAll.bind(postsController));
router.get('/:id', (req, res) => { postsController.getById(req, res) });

router.post('/', authMiddleware, postsController.createItem.bind(postsController));

router.put('/:id', authMiddleware, (req, res) => { postsController.updateItemById(req, res) });

router.delete('/:id', authMiddleware, (req, res) => { postsController.deleteItemById(req, res) });

export default router;