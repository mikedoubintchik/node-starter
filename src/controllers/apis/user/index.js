import express from 'express';
import userService from '../../../services/user';

const router = express.Router();

router.get('/', userService.getUsers);
router.get('/:id', userService.getUserById);

export default router;
