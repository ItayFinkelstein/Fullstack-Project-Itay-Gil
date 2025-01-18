import { Router } from 'express';
import postsController from '../controllers/post_controller';

const router = Router();

router.get('/', postsController.getAll.bind(postsController));
router.get('/:id', (req, res) => { postsController.getById(req, res) });

router.post('/', postsController.createItem.bind(postsController));

router.put('/:id', (req, res) => { postsController.updateItemById(req, res) });

router.delete('/:id', (req, res) => { postsController.deleteItemById(req, res) });

export default router;