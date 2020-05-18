'use strict';

import express from 'express';
import userController from '../../../controllers/apis/user';

let router = express.Router();

router.use('/users', userController);

export default router;
