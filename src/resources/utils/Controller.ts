import { Request, Response, NextFunction } from "express";
import JsonResponseWrapper from './JsonResponseWrapper';
import statusCodes from "../../constants/StatusCodes";


class Controller {
    protected model: any = '';

    public createOne = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        const data = await this.model.create({
            ...req.body
        })
        return JsonResponseWrapper(
            res,
            {
                status: statusCodes.CREATED,
                data
            }
        )
    }


    public checkRecord = async (req: Request, res: Response, next: NextFunction) => {
        const record = await this.model.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!record) {
            return JsonResponseWrapper(
                res, {
                status: statusCodes.NOT_FOUND,
                message: `${this.model.name} does not exist`
            })
        }
        next()
    }


    public getOne = async (req: Request, res: Response) => {
        const record = await this.model.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!record) {
            return JsonResponseWrapper(
                res, {
                status: statusCodes.NOT_FOUND,
                message: `${this.model.name} does not exist`
            })
        }
        return JsonResponseWrapper(res, {
            status: statusCodes.OK,
            data: record,
        })

    }

}
export default Controller;