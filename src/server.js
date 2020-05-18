import compression from 'compression';
import express from 'express';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import http from 'http';
// import createError from 'http-errors';
import https from 'https';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import config from './config';
import sequelize from './db';
import routes from './routes';
import swaggerDocument from './swagger.json';
// import createError from 'http-errors';
const debug = require('debug')('test:server');

const server = express();

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // swagger documentation
server.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // rate limiter
server.use(compression()); // GZIP compression
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(morgan('dev')); // logger
// server.use((req, res, next) => next(createError(404))); // catch 404 and forward to error handler

// // error handler
// server.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = config.env === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// setup routes
routes(server);

// Get our key and cert
const key = fs.readFileSync('/certs/cert.key');
const cert = fs.readFileSync('/certs/cert.crt');

// Create our servers
sequelize
  .authenticate()
  .then(() => {
    console.debug('connection to db successful');
    if (config.env === 'development')
      http
        .createServer(server)
        .listen(normalizePort(config.server.http_port), () =>
          console.debug('http server started')
        )
        .on('error', onError);
    else
      https
        .createServer({ key, cert }, server)
        .listen(normalizePort(config.server.https_port), () =>
          console.debug('https server started')
        )
        .on('error', onError);
  })
  .catch((error) => console.error('connection to db failed: \n', error));

// Normalize a port into a number, string, or false.
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) return val;

  if (port >= 0) return port;

  return false;
};

// Event listener for HTTP server "error" event.
const onError = (error) => {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

export default server;
