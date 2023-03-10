// utils
import express from 'express';

import { AuthMiddleware } from '../middlewares/auth.middleware';

import {
  create,
  get,
  getAll,
  remove,
  returnTicket,
  update,
} from '../controllers/ticket.controller';

const router = express.Router();

router.get('/', AuthMiddleware, getAll);

router.get('/get/:id', AuthMiddleware, get);

router.patch('/update/:id', [AuthMiddleware], update);

router.delete('/delete/:id', [AuthMiddleware], remove);

router.delete('/return-ticket/:id', [AuthMiddleware], returnTicket);

router.post('/', [AuthMiddleware], create);

export default router;
