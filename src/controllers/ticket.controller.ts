import { NextFunction, Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { InferCreationAttributes } from 'sequelize';
import { ErrorException } from '../utils/error-handler/error-exception';
import { ErrorCode } from '../utils/error-handler/error-code';
import { getExistedFields } from '../utils/get-existed-fields';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { price } = req.body;

  try {
    const ticket: Omit<
      InferCreationAttributes<Ticket, { omit: 'id' }>,
      'id'
    > = { price };
    const entity = await Ticket.create(ticket as any);

    if (!entity) {
      return next(new ErrorException(ErrorCode.CreationFailed));
    }

    res.send({
      done: true,
      ticket: entity,
    });
  } catch (e) {
    return next(new ErrorException(ErrorCode.CreationFailed));
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { price } = req.body;

  try {
    const ticket = getExistedFields({ price }, ['price']);
    const entity = await Ticket.update(ticket, { where: { id } });

    if (!entity) {
      return next(new ErrorException(ErrorCode.NotFound));
    }

    res.send({ done: true, ticket: entity });
  } catch (e) {
    return next(new ErrorException(ErrorCode.NotFound));
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const affectedEntities = await Ticket.destroy({ where: { id } });

    if (!affectedEntities) {
      return next(new ErrorException(ErrorCode.NotFound));
    }

    res.send({ done: true });
  } catch (e) {
    return next(new ErrorException(ErrorCode.NotFound));
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tickets = await Ticket.findAll();
    res.send({ done: true, tickets });
  } catch (e) {
    return next(new ErrorException(ErrorCode.GetAllFailed));
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findOne({ where: { id } });
    res.send({ done: true, ticket });
  } catch (e) {
    return next(new ErrorException(ErrorCode.GetAllFailed));
  }
};
