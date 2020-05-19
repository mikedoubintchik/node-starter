import fs from 'fs';
import http from 'http';
import https from 'https';
import app from '../app';
import config from '../config';
import sequelize from './db';
import models from './models';

// Get our key and cert
const key = fs.readFileSync('/certs/cert.key');
const cert = fs.readFileSync('/certs/cert.crt');

// Create our servers
const eraseDatabaseOnSync = false;

sequelize
  .sync({ force: eraseDatabaseOnSync })
  .then(() => {
    console.debug('connection to db synced');

    if (eraseDatabaseOnSync) createUsersWithMessages(100);

    if (config.env === 'development')
      http
        .createServer(app)
        .listen(normalizePort(config.server.http_port), () =>
          console.debug('http server started')
        )
        .on('error', onError);
    else
      https
        .createServer({ key, cert }, app)
        .listen(normalizePort(config.server.https_port), () =>
          console.debug('https server started')
        )
        .on('error', onError);
  })
  .catch((error) => console.error('connection to db failed: \n', error));

// Seed database
const createUsersWithMessages = async (numberOfUsers) => {
  for (let i = 1; i <= numberOfUsers; i++) {
    models.User.create(
      {
        email: `mike${i}@mike.com`,
        messages: [
          {
            text: 'Mike is cool'
          }
        ]
      },
      {
        include: [models.Message]
      }
    );
  }
};

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
