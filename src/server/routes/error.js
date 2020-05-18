'use strict';

import express from 'express';
import errorController from '../controllers/error';

const router = express.Router();

router.get('/', errorController);

export default router;
