import compression from 'compression';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import frameguard from 'frameguard';
import hsts from 'hsts';
import morgan from 'morgan';
import 'regenerator-runtime/runtime.js';
import swaggerUi from 'swagger-ui-express';
import xssFilter from 'x-xss-protection';
import models from './server/models';
import routes from './server/routes';
import swaggerDocument from './swagger.json';

const debug = require('debug')('test:server');
const app = express();

app.use(cors()); // cors
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // swagger documentation
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // rate limiter
app.use(compression()); // GZIP compression
app.use(express.json({ limit: '300kb' })); // body-parser body size limit of 300kb
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny')); // logger
app.use(frameguard({ action: 'sameorigin' })); // x-frames header
app.use(hsts({ maxAge: 5184000, includeSubDomains: true, preload: true })); // hsts header
app.use(xssFilter()); // xss header

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('rwieruch')
  };
  next();
});

// setup routes
routes(app);

export default app;
