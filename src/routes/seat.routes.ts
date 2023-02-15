// utils
import express from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';

import {
  create,
  get,
  getAll,
  getSeatsByTheater,
  remove,
  update,
} from '../controllers/seat.controller';

const router = express.Router();

router.get('/', AuthMiddleware, getAll);

router.get('/get/:id', AuthMiddleware, get);

router.get('/get/seat-by-theater/:theaterId', getSeatsByTheater);

router.patch('/update/:id', [AuthMiddleware, RoleMiddleware], update);

router.delete('/delete/:id', [AuthMiddleware, RoleMiddleware], remove);

router.post('/', [AuthMiddleware, RoleMiddleware], create);

export default router;
