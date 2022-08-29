import express from 'express';
import { StatusCodes } from 'http-status-codes';
import PostRoute from '../routes/PostRoute';
import ErrorMiddleware from '../middlewares/ErrorMiddleware';

const app = express();

/** Use qs parser to support nested objects, more information in http://expressjs.com/pt-br/api.html#express.urlencoded */
app.use(express.urlencoded({ extended: true }));
/** Express built-in body parser */
app.use(express.json());

/** Routes */
app.use('/posts', PostRoute);

/** Check if server is up */
app.get('/ping', (_req, res) => res.status(StatusCodes.OK).json({ message: 'pong' }));

/** Error middleware */
app.use(ErrorMiddleware);

export default app;
