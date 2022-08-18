import * as express from 'express';

import bodyParser from 'body-parser';

import cors from 'cors';

import { errors } from 'celebrate';

import helmet from "helmet";

import routes from '../api/routes/index';

const morgan = require('morgan');
export default (app: express.Application) => {
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(morgan('tiny'));
    app.use(errors());
    app.use('/api', routes);
};