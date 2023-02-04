import { ERoles } from '../../enums/role';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import { ErrorException } from '../error-handler/error-exception';
import { ErrorCode } from '../error-handler/error-code';

export const verifyToken = (token?: string): { id: string; email: string; role: ERoles } => {
  try {
    if (token) {
      if (token.startsWith('Bearer')) {
        token = token.slice(7);
      }

      const tokenData = jwt.verify(token, JWT_SECRET);
      return tokenData as { id: string; email: string; role: ERoles };
    } else {
      throw new ErrorException(ErrorCode.Unauthenticated);
    }
  } catch (error) {
    throw new ErrorException(ErrorCode.Unauthenticated);
  }
};
