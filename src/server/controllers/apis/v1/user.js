import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const paginateSort = ({ offset, limit, orderBy, order }) => {
    let query = {};

    if (offset && limit) query.offset = offset * limit;
    if (limit) query.limit = limit;
    if (orderBy && order) query.order = [[orderBy, order]];

    return query;
  };

  const users = await req.context.models.User.findAll({
    ...paginateSort({ ...req.query })
  });
  return res.send(users);
});

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId);
  return res.send(user);
});

export default router;
