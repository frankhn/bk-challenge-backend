
import Controller from '../utils/Controller';
import JsonResponseWrapper from '../utils/JsonResponseWrapper';
import statusCodes from '../../constants/StatusCodes';
import Job from './job.model';

class JobController extends Controller {

    protected model = Job

    public getAllJobs = async (req: any, res: any) => {
        const data = await Job.findAll({
            attributes: ['id', 'title', 'description'],
            limit: req.query.limit || 10,
            offset: req.query.page || 0,
        })
        return JsonResponseWrapper(
            res,
            {
                status: statusCodes.OK,
                data
            })
    }
}

export default JobController