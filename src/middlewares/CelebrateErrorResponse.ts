import { isCelebrate } from 'celebrate'
import StatusCodes from '../constants/StatusCodes';

const ErrorResponse = () => (error: any, req: any, res: any, next: any) => {
  if (!isCelebrate(error)) return next(error)
  return res.status(StatusCodes.BAD_REQUEST).json({
    error: {
      status: StatusCodes.BAD_REQUEST,
      message: error.joi.details[0].message || undefined,
    }
  })
}

export default ErrorResponse;
