// utils
import express from 'express';

import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RoleMiddleware } from '../middlewares/role.middleware';

import {
  create,
  get,
  getAll,
  remove,
  update,
} from '../controllers/ticket.controller';

const router = express.Router();

router.get('/', AuthMiddleware, getAll);

router.get('/get/:id', AuthMiddleware, get);

router.patch('/update/:id', [AuthMiddleware, AuthMiddleware], update);

router.delete('/delete/:id', [AuthMiddleware, RoleMiddleware], remove);

router.post('/', [AuthMiddleware, RoleMiddleware], create);

export default router;
