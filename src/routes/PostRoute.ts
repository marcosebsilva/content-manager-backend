import { Router } from 'express';
import {
  update,
  remove,
  create,
  getAll,
  getOne,
} from '../controllers/PostController';

const router = Router();

router.post('/', create);
router.get('/', getAll);
router.get('/:postId', getOne);
router.patch('/:postId', update);
router.delete('/:postId', remove);

export default router;
