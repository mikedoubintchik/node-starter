'use strict';

import config from '../../config';
import apiRoute from './apis';
import errorRoute from './error';
import healthRoute from './health';

const init = (server) => {
  server.get('*', function (req, res, next) {
    console.log('Request was made to: ' + req.originalUrl);
    return next();
  });

  server.get('/', function (req, res) {
    res.redirect('/health');
  });

  server.use(config.api.prefix, apiRoute);
  server.use('/health', healthRoute);
  server.use('/error', errorRoute);
};

export default init;
