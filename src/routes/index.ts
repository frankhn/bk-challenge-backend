import express from 'express';
import applicationRoutes from '../resources/applications/application.routes';
import authRoutes from '../resources/auth/auth.routes';
import jobRoutes from '../resources/jobs/jobs.routes';
/** *************************************** */

const app = express();

/** *************************************** */

/**
 * user account
 */
app.use('/auth', authRoutes);


app.use('/jobs', jobRoutes);


app.use('/applications', applicationRoutes);


export default app;
