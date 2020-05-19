'use strict';

import { Router } from 'express';
import messagesController from '../../controllers/apis/message';
import sessionController from '../../controllers/apis/session';
import userController from '../../controllers/apis/user';

let router = Router();

router.use('/users', userController);
router.use('/messages', messagesController);
router.use('/session', sessionController);

export default router;
