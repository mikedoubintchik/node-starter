import compression from 'compression';
import express from 'express';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import routes from './server/routes';
import swaggerDocument from './swagger.json';
const debug = require('debug')('test:server');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // swagger documentation
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // rate limiter
app.use(compression()); // GZIP compression
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // logger

// setup routes
routes(app);

export default app;
