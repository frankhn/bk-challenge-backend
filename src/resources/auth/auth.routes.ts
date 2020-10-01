import express from 'express'
import * as validations from './auth.validation'
import AuthController from "./auth.controller";
import asyncHandler from '../../middlewares/asyncHandler';

const auth = new AuthController();

/** ******************************************* */

const authRoutes = express.Router();

/** ******************************************* */

authRoutes
    .route('/register')
    .all()
    .post(
        validations.register,
        auth.checkUser,
        asyncHandler(
            auth.createOne
        )
    );

authRoutes
    .route('/login')
    .all()
    .post(
        validations.login,
        asyncHandler(
            auth.login
        )
    )


export default authRoutes