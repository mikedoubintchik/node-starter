'use strict';

import express from 'express';
import healthController from '../controllers/health';

let router = express.Router();

router.get('/', healthController);

export default router;
