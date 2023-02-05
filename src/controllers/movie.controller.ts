import { NextFunction, Request, Response } from 'express';
import { Theater } from '../models/theater';
import { InferCreationAttributes } from 'sequelize';
import { ErrorException } from '../utils/error-handler/error-exception';
import { ErrorCode } from '../utils/error-handler/error-code';
import { getExistedFields } from '../utils/get-existed-fields';
import { Movie } from '../models/movie';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description, duration, age } = req.body;

  try {
    const movie: Omit<InferCreationAttributes<Movie, { omit: 'id' }>, 'id'> = {
      name,
      description,
      duration,
      age,
    };
    const entity = await Theater.create(movie as any);

    if (!entity) {
      return next(new ErrorException(ErrorCode.CreationFailed));
    }

    res.send({
      done: true,
      movie: entity,
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
  const { name, description, duration, age } = req.body;

  try {
    const movie = getExistedFields({ name, description, duration, age }, [
      'name',
      'description',
      'duration',
      'age',
    ]);
    const entity = await Movie.update(movie, { where: { id } });

    if (!entity) {
      return next(new ErrorException(ErrorCode.UpdateFailed));
    }

    res.send({ done: true, theater: entity });
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
    const affectedEntities = await Movie.destroy({ where: { id } });

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
    const movies = await Movie.findAll();
    res.send({ done: true, movies });
  } catch (e) {
    return next(new ErrorException(ErrorCode.GetAllFailed));
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findOne({ where: { id } });
    res.send({ done: true, movie });
  } catch (e) {
    return next(new ErrorException(ErrorCode.NotFound));
  }
};
