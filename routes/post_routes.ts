import { Router } from 'express';
import postController from '../controllers/post';

const router = Router();

router.get('/', postController.getAll.bind(postController));
router.get('/:id', (req, res) => { postController.getById(req, res) });

router.post('/', postController.createItem.bind(postController));

router.put('/:id', (req, res) => { postController.updateItemById(req, res) });

router.delete('/:id', (req, res) => { postController.deleteItemById(req, res) });

export default router;