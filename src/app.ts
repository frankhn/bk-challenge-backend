import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import routes from './routes/index'
import './database/models/associations'
import ErrorResponse from './middlewares/CelebrateErrorResponse';

const app: Application = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(express.static(`${__dirname}/`));

// enable cors
app.use(cors())

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    return res.status(400).json({
      status: 400,
      accepted: 'PUT, POST, GET, DELETE'
    });
  }
  return next();
});
app.use('/api', routes);

app.use(ErrorResponse())
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: 'Request not found',
  })
})

export default app;