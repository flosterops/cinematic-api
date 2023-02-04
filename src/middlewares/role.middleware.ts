import { NextFunction, Request, Response } from 'express';
import { ErrorException } from '../utils/error-handler/error-exception';
import { ErrorCode } from '../utils/error-handler/error-code';
import { ERoles } from '../enums/role';
import { verifyToken } from '../utils/token';

export const checkAdminRole = (role: ERoles) => role === ERoles.admin;

export const RoleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer')) {
    const token = auth.slice(7);

    try {
      const tokenData = verifyToken(token);
      const isAdmin = checkAdminRole(tokenData.role);

      if (!isAdmin) {
        throw new ErrorException(ErrorCode.NoPermission);
      }

      req.body.isAdmin = isAdmin;
      next();
    } catch (error) {
      throw new ErrorException(ErrorCode.NoPermission);
    }
  } else {
    throw new ErrorException(ErrorCode.NoPermission);
  }
};
