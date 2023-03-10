import { NextFunction, Request, Response } from 'express';
import { Theater } from '../models/theater';
import { InferCreationAttributes } from 'sequelize';
import { ErrorException } from '../utils/error-handler/error-exception';
import { ErrorCode } from '../utils/error-handler/error-code';
import { getExistedFields } from '../utils/get-existed-fields';
import { createArrayFromNumber } from '../utils/array/create-arrat-from-number';
import { Seat } from '../models/seat';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, number_of_seats, list_of_features, number_of_rows } = req.body;

  try {
    const theater: Omit<
      InferCreationAttributes<Theater, { omit: 'id' }>,
      'id'
    > = { name, number_of_seats: Number(number_of_seats), list_of_features };
    const entity = await Theater.create(theater as any);

    const arrayOfRows = createArrayFromNumber(Number(number_of_rows));
    const arrayOfSeats = createArrayFromNumber(Number(number_of_seats));

    arrayOfRows.forEach((row) => {
      arrayOfSeats.forEach(async (seat) => {
        await Seat.create({
          number: seat,
          row,
          type: 'default',
          reserved: false,
          theaterId: entity.id,
        } as any);
      });
    });

    if (!entity) {
      return next(new ErrorException(ErrorCode.CreationFailed));
    }

    res.send({
      done: true,
      theater: entity,
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
  const { name, number_of_seats, list_of_features } = req.body;

  try {
    const theater = getExistedFields(
      { name, number_of_seats, list_of_features },
      ['name', 'number_of_seats', 'list_of_features']
    );
    const entity = await Theater.update(theater, { where: { id } });

    if (!entity) {
      return next(new ErrorException(ErrorCode.NotFound));
    }

    res.send({ done: true, theater: entity });
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
    const affectedEntities = await Theater.destroy({ where: { id } });

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
    const theaters = await Theater.findAll();
    res.send({ done: true, theaters });
  } catch (e) {
    return next(new ErrorException(ErrorCode.GetAllFailed));
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const theater = await Theater.findOne({ where: { id } });
    res.send({ done: true, theater });
  } catch (e) {
    return next(new ErrorException(ErrorCode.GetAllFailed));
  }
};
