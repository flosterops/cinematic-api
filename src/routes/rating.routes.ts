// utils
import express from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';

import {
  create,
  get,
  getAll,
  remove,
  update,
} from '../controllers/rating.controller';

const router = express.Router();

router.get('/get-movie-rating/:movieId', AuthMiddleware, getAll);

router.get('/get/:id', AuthMiddleware, get);

router.patch('/update/:id', [AuthMiddleware], update);

router.delete('/delete/:id', [AuthMiddleware], remove);

router.post('/add-review/:movieId', [AuthMiddleware], create);

export default router;
