import { NextFunction, Request, Response } from 'express';
import { Theater } from '../models/theater';
import { InferCreationAttributes } from 'sequelize';
import { ErrorException } from '../utils/error-handler/error-exception';
import { ErrorCode } from '../utils/error-handler/error-code';
import { getExistedFields } from '../utils/get-existed-fields';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { name, number_of_seats, age } = req.body;

  try {
    const theater: Omit<InferCreationAttributes<Theater, { omit: 'id' }>, 'id'> = { name, number_of_seats, age };
    const entity = await Theater.create(theater as any);

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

export const update = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, number_of_seats, age } = req.body;

  try {
    const theater = getExistedFields({ name, number_of_seats, age }, ['name', 'number_of_seats', 'age']);
    const entity = await Theater.update(theater, { where: { id } });

    if (!entity) {
      return next(new ErrorException(ErrorCode.CreationFailed));
    }

    res.send({ done: true, theater: entity });
  } catch (e) {
    return next(new ErrorException(ErrorCode.CreationFailed));
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const affectedEntities = await Theater.destroy({ where: { id } });

    if (!affectedEntities) {
      return next(new ErrorException(ErrorCode.CreationFailed));
    }

    res.send({ done: true });
  } catch (e) {
    return next(new ErrorException(ErrorCode.CreationFailed));
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const theaters = await Theater.findAll();
    res.send({ done: true, theaters });
  } catch (e) {
    return next(new ErrorException(ErrorCode.CreationFailed));
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const theater = await Theater.findOne({ where: { id } });
    res.send({ done: true, theater });
  } catch (e) {
    return next(new ErrorException(ErrorCode.CreationFailed));
  }
};
