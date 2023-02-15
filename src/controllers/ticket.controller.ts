import { NextFunction, Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { InferCreationAttributes } from 'sequelize';
import { ErrorException } from '../utils/error-handler/error-exception';
import { ErrorCode } from '../utils/error-handler/error-code';
import { getExistedFields } from '../utils/get-existed-fields';
import { verifyToken } from '../utils/token';
import { Show } from '../models/show';
import { Seat } from '../models/seat';
import { Theater } from '../models/theater';
import { Movie } from '../models/movie';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { showId, seatIds } = req.body;

  try {
    const decoded = verifyToken(req.headers.authorization);
    seatIds.forEach(async (id: number) => {
      const ticket: Omit<
        InferCreationAttributes<Ticket, { omit: 'id' }>,
        'id'
      > = { showId, seatId: id, userId: decoded.id };

      const entity = await Ticket.create(ticket as any);
      const result = await Seat.update({ reserved: true }, { where: { id } });

      if (!entity || !result) {
        return next(new ErrorException(ErrorCode.CreationFailed));
      }
    });

    res.send({ done: true });
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
  const { showId, seatId } = req.body;

  try {
    const ticket = getExistedFields({ showId, seatId }, ['showId', 'seatId']);
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
    const decoded = verifyToken(req.headers.authorization);
    const tickets = await Ticket.findAll({
      where: { userId: decoded.id } as any,
      include: [
        { model: Show, include: [{ model: Theater }, { model: Movie }] },
        { model: Seat },
      ],
    });

    res.send({ done: true, tickets });
  } catch (e) {
    return next(new ErrorException(ErrorCode.GetAllFailed));
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const decoded = verifyToken(req.headers.authorization);
    const ticket = await Ticket.findOne({
      where: { id, userId: decoded.id } as any,
    });
    res.send({ done: true, ticket });
  } catch (e) {
    return next(new ErrorException(ErrorCode.GetAllFailed));
  }
};

export const returnTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const decoded = verifyToken(req.headers.authorization);
    const ticket: any = await Ticket.findOne({
      where: { id, userId: decoded.id } as any,
    });

    if (!ticket) {
      return next(new ErrorException(ErrorCode.GetAllFailed));
    }

    await Seat.update({ reserved: false }, { where: { id: ticket?.seatId } });
    const success = await Ticket.destroy({
      where: { id, userId: decoded.id } as any,
    });
    res.send({ done: true, ticket: success });
  } catch (e) {
    return next(new ErrorException(ErrorCode.GetAllFailed));
  }
};
