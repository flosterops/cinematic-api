import { NextFunction, Request, Response } from 'express';
import { ErrorException } from '../utils/error-handler/error-exception';
import { ErrorCode } from '../utils/error-handler/error-code';
import { getExistedFields } from '../utils/get-existed-fields';
import { Show } from '../models/show';
import { Theater } from '../models/theater';
import { Movie } from '../models/movie';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date, theaterId, movieId, price } = req.body;

  try {
    const show: any = {
      date,
      theaterId,
      movieId,
      price,
    };
    const entity = await Show.create(show as any);

    if (!entity) {
      return next(new ErrorException(ErrorCode.CreationFailed));
    }

    res.send({
      done: true,
      show: entity,
    });
  } catch (e) {
    console.log(e);
    res.send({ error: e });
    return next(new ErrorException(ErrorCode.CreationFailed));
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { date, price, theaterId, movieId } = req.body;

  try {
    const show = getExistedFields({ date, price, theaterId, movieId }, [
      'date',
      'price',
      'theaterId',
      'movieId',
    ]);
    const entity = await Show.update(show, { where: { id } });

    if (!entity) {
      return next(new ErrorException(ErrorCode.NotFound));
    }

    res.send({ done: true, show: entity });
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
    const affectedEntities = await Show.destroy({ where: { id } });

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
    const shows = await Show.findAll({
      include: [{ model: Theater }, { model: Movie }],
    });

    res.send({ done: true, shows });
  } catch (e) {
    return next(new ErrorException(ErrorCode.GetAllFailed));
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const show = await Show.findOne({
      where: { id },
      include: [{ model: Theater }, { model: Movie }],
    });
    res.send({ done: true, show });
  } catch (e) {
    return next(new ErrorException(ErrorCode.GetAllFailed));
  }
};
