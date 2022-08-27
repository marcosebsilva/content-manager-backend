import { Router } from 'express';
import PostController from '../controllers/PostController';

const router = Router();
const controller = new PostController();

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:postId', controller.getOne);
router.patch('/:postId', controller.update);
router.delete('/:postId', controller.delete);

export default router;