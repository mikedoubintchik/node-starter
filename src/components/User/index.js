import express from 'express';
const router = express.Router();

// get all users
router.get('/', function (req, res, next) {
  res.send('user', { user: true });
});

export default router;
