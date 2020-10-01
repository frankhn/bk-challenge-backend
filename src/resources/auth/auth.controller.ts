import Controller from '../utils/Controller'
import statusCodes from '../../constants/StatusCodes';
import { NextFunction } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';
import User from '../users/user.model';
import JsonResponseWrapper from '../utils/JsonResponseWrapper';
import SignedToken from '../../helpers/token/signedToken';
import Encrypt from '../../helpers/validations/Encrypt';

interface Login {
    email: string
    password: string
}

class AuthController extends Controller {

    protected model = User

    /**
     * Login
     * @memberof User
     */
    public login = async (req: any, res: any, next: NextFunction) => {
        const { password, email }: Login = req.body;
        const user = await this.getUserByEmail(email)
        console.log(user)
        if (user && user.password != null && Encrypt.decrypt(password, user.password)) {
            req.user = {
                id: user.id
            }
            const token = SignedToken.tokenGenerator({
                id: user.id,
            })
            const data = await this.getUser(req.user.id)
            return JsonResponseWrapper(res, {
                status: statusCodes.OK,
                message: 'success login',
                data,
                token
            })
        }
        return JsonResponseWrapper(
            res, {
            status: statusCodes.BAD_REQUEST,
            message: 'Incorrect Credentials'
        })
    }


    /** Return user information */

    public getUser = async (id: string) => {
        const record = await this.model.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['password', 'cityId']
            },
        })
        return record
    }

    /** Return user information */

    public getUserByEmail = async (email: string) => {
        const record = await this.model.findOne({
            where: {
                email
            },
        })
        return record
    }

    /** Check if a user exists */
    public checkUser = asyncHandler(
        async (req: any, res: any, next: NextFunction): Promise<any> => {
            const { email } = req.body
            const record = await this.model.findOne({
                where: {
                    email
                },
            })
            if (record) {
                return JsonResponseWrapper(
                    res, {
                    status: statusCodes.BAD_REQUEST,
                    message: 'Account already exists'
                })
            }
            next()
        }
    )

}

export default AuthController;
