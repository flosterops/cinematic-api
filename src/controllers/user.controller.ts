// utils
import { Request, Response, NextFunction } from 'express';
import { ErrorException } from '../utils/error-handler/error-exception';
import { ErrorCode } from '../utils/error-handler/error-code';
import { comparePassword } from '../utils/password-hash';
import { generateAuthToken, verifyToken } from '../middlewares/auth.middleware';
import { hashPassword } from '../utils/password-hash';
import { User } from '../models/user';
import { TOKEN_EXPIRES_IN } from '../config';

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  // check if user exists
  const userExists = await User.findOne({ rejectOnEmpty: true, where: { email } });
  if (!userExists) {
    next(new ErrorException(ErrorCode.NotFound));
  } else {
    // validate the password
    const validPassword = comparePassword(password, userExists.password);
    if (!validPassword) {
      next(new ErrorException(ErrorCode.WrongCredentials));
    }

    // generate the token
    const token = generateAuthToken(userExists);

    res.send({ token, tokenType: 'Bearer', expiresIn: TOKEN_EXPIRES_IN });
  }
};

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password } = req.body;
  // check if user exists
  await User.sync();
  const userExists = await User.findOne({ rejectOnEmpty: false, where: { email } });
  if (!!userExists) {
    next(new ErrorException(ErrorCode.DuplicateEntityError, { email }));
  }

  // generate password hash
  const hash = hashPassword(password);
  const newUser: any = {
    email,
    name,
    password: hash,
  };
  // TODO
  await User.create(newUser as any);
  res.send({ done: true });
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  const decoded = verifyToken(req.headers.authorization);

  const user = await User.findOne({ where: { id: decoded.id } });
  if (user) {
    res.send({
      email: user.email,
      name: user.name,
    });
  } else {
    next(new ErrorException(ErrorCode.NotFound));
  }
};
