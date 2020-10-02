
import Controller from '../utils/Controller';
import JsonResponseWrapper from '../utils/JsonResponseWrapper';
import statusCodes from '../../constants/StatusCodes';
import Application from './application.model';
import User from '../users/user.model';
import Job from '../jobs/job.model';


class CountryController extends Controller {

    protected model = Application

    public createApplication = async (req: any, res: any) => {
        const data = await User.create({ ...req.body })
        await this.model.create({
            userid: data.id,
            jobid: req.params.id
        })
        return JsonResponseWrapper(
            res,
            {
                status: statusCodes.OK,
                message: 'You Application has been submitted successfully'
            })
    }

    public getAllApplications = async (req: any, res: any) => {
        const data = await this.model.findAll({
            attributes: ['id', 'createdAt', 'updatedAt'],
            include: [{
                model: User,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                order: [
                    ['name', 'ASC'],
                ]
            }, {
                model: Job,
                attributes: ['title', 'description'],
                order: [
                    ['name', 'ASC'],
                ]
            }],
            limit: Number(req.query.limit) || 10,
            offset: Number(req.query.page) || 0,
        })
        return JsonResponseWrapper(
            res,
            {
                status: statusCodes.OK,
                data
            })
    }
}

export default CountryController