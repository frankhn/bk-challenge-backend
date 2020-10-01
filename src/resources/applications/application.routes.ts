import express from 'express';
import Application from './applications.controller';
import * as validations from './application.validations';
import asyncHandler from '../../middlewares/asyncHandler';

const application = new Application()

/** ******************************************* */

const applicationRoutes = express.Router();

/** ******************************************* */

applicationRoutes
  .route('/')
  .all()
  .get(
    asyncHandler(
      application.getAllApplications
    ));

applicationRoutes
  .route('/:id')
  .all()
  .get(
    asyncHandler(
      application.getOne
    ))
  .post(
    validations.createOne,
    asyncHandler(application.createApplication)
  )

export default applicationRoutes;
