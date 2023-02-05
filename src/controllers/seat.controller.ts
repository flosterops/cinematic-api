import { NextFunction, Request, Response } from 'express';
import { InferCreationAttributes } from 'sequelize';
import { ErrorException } from '../utils/error-handler/error-exception';
import { ErrorCode } from '../utils/error-handler/error-code';
import { getExistedFields } from '../utils/get-existed-fields';
import { Seat } from '../models/seat';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // tslint:disable-next-line:variable-name
  const { number, row, type, removable } = req.body;

  try {
    const seat: Omit<InferCreationAttributes<Seat, { omit: 'id' }>, 'id'> = {
      number,
      row,
      type,
      removable,
    };
    const entity = await Seat.create(seat as any);

    if (!entity) {
      return next(new ErrorException(ErrorCode.CreationFailed));
    }

    res.send({ done: true, movie: entity });
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
  // tslint:disable-next-line:variable-name
  const { number, row, type, removable } = req.body;

  try {
    const seat = getExistedFields({ number, row, type, removable }, [
      'number',
      'row',
      'type',
      'removable',
    ]);
    const entity = await Seat.update(seat, { where: { id } });

    if (!entity) {
      return next(new ErrorException(ErrorCode.UpdateFailed));
    }

    res.send({ done: true, seat: entity });
  } catch (e) {
    return next(new ErrorException(ErrorCode.UpdateFailed));
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const affectedEntities = await Seat.destroy({ where: { id } });

    if (!affectedEntities) {
      return next(new ErrorException(ErrorCode.CreationFailed));
    }

    res.send({ done: true });
  } catch (e) {
    return next(new ErrorException(ErrorCode.CreationFailed));
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const seats = await Seat.findAll();
    res.send({ done: true, seats });
  } catch (e) {
    return next(new ErrorException(ErrorCode.GetAllFailed));
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const seat = await Seat.findOne({ where: { id } });
    res.send({ done: true, seat });
  } catch (e) {
    return next(new ErrorException(ErrorCode.NotFound));
  }
};
