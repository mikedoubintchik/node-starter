'use strict';

import { Router } from 'express';
import messagesController from '../../controllers/apis/v1/message';
import sessionController from '../../controllers/apis/v1/session';
import userController from '../../controllers/apis/v1/user';

let router = Router();

router.use('/users', userController);
router.use('/messages', messagesController);
router.use('/session', sessionController);

export default router;
