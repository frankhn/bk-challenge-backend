/* eslint-disable import/no-unresolved */
import express from 'express';
import * as validations from './jobs.validations';
import asyncHandler from '../../middlewares/asyncHandler';
import Job from './jobs.controller';

const job = new Job()

/** ******************************************* */

const jobRoutes = express.Router();

/** ******************************************* */

jobRoutes
  .route('/')
  .all()
  .post(
    validations.createOne,
    asyncHandler(job.createOne)
  )
  .get(
    asyncHandler(
      job.getAllJobs
    ));

jobRoutes
  .route('/:id')
  .all()
  .get(
    asyncHandler(
      job.getOne
    ));



export default jobRoutes;
