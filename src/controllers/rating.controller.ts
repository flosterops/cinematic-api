import { NextFunction, Request, Response } from 'express';
import { InferCreationAttributes } from 'sequelize';
import { ErrorException } from '../utils/error-handler/error-exception';
import { ErrorCode } from '../utils/error-handler/error-code';
import { getExistedFields } from '../utils/get-existed-fields';
import { Rating } from '../models/rating';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { stars, review } = req.body;

  try {
    const rating: Omit<
      InferCreationAttributes<Rating, { omit: 'id' }>,
      'id'
    > = {
      stars,
      review,
    };
    const entity = await Rating.create(rating as any);

    if (!entity) {
      return next(new ErrorException(ErrorCode.CreationFailed));
    }

    res.send({
      done: true,
      rating: entity,
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
  const { stars, review } = req.body;

  try {
    const rating = getExistedFields({ stars, review }, ['stars', 'review']);
    const entity = await Rating.update(rating, { where: { id } });

    if (!entity) {
      return next(new ErrorException(ErrorCode.UpdateFailed));
    }

    res.send({ done: true, rating: entity });
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
    const affectedEntities = await Rating.destroy({ where: { id } });

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
    const ratings = await Rating.findAll();
    res.send({ done: true, ratings });
  } catch (e) {
    return next(new ErrorException(ErrorCode.GetAllFailed));
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const rating = await Rating.findOne({ where: { id } });
    res.send({ done: true, rating });
  } catch (e) {
    return next(new ErrorException(ErrorCode.NotFound));
  }
};
