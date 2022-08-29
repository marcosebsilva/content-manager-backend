import { Router } from 'express';
import PostController from '../controllers/PostController';

const router = Router();

router.post('/', PostController.create);
router.get('/', PostController.getAll);
router.get('/:postId', PostController.getOne);
router.patch('/:postId', PostController.update);
router.delete('/:postId', PostController.delete);

export default router;
