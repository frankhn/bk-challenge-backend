import { Request, Response, NextFunction } from 'express'
import statusCodes from '../constants/StatusCodes'
import JsonResponseWrapper from '../resources/utils/JsonResponseWrapper'



export default (cb: any) => async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | undefined> => {
    try {
        await cb(req, res, next)
    } catch (error) {
        if (error.parent && error.parent.code == 23503) {
            return JsonResponseWrapper(
                res,
                {
                    status: statusCodes.BAD_REQUEST,
                    message: `${error.parent.detail.substring(error.parent.detail.indexOf('(') + 1, error.parent.detail.indexOf(')'))} does not exist`
                })
        }

        if (error && error.errors[0]) {
            return JsonResponseWrapper(
                res,
                {
                    status: error.status | statusCodes.SERVER_ERROR,
                    message: error && error.errors[0]
                        ? error.errors[0].message
                        : undefined
                })
        }
    }
}