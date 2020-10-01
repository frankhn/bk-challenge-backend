import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import JsonResponseWrapper from '../resources/utils/JsonResponseWrapper';
import statusCodes from '../constants/StatusCodes';
import User from '../resources/users/user.model';

const { SECRETKEY = '' } = process.env;

interface Roles {
  roles?: Array<string>;
}

const checkAuth = ({ roles = [] }: Roles = {}) => async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  const token = authorization

  if (!token) {
    return JsonResponseWrapper(
      res,
      {
        status: statusCodes.UNAUTHORIZED,
        message: 'Unauthorized access',
      }
    );
  }

  jwt.verify(token, SECRETKEY, async (err: any, decoded: any) => {
    if (err || !decoded) {
      if (err.name === 'TokenExpiredError') {
        return JsonResponseWrapper(
          res,
          {
            status: statusCodes.UNAUTHORIZED,
            message: 'Session expired. Please login again'
          }
        );
      }

      return JsonResponseWrapper(
        res,
        {
          status: statusCodes.UNAUTHORIZED,
          message: 'Invalid token',
        });
    }

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return JsonResponseWrapper(
        res,
        {
          status: statusCodes.UNAUTHORIZED,
          message: 'Invalid token'
        },
      );
    }
    req.user = user;
    next();
  });
};

export default checkAuth;
