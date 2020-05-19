import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const paginateSort = ({ offset, limit, orderBy, order }) => {
    const page = offset * limit;
    const pageSize = limit;
    let sort = ['id', 'ASC'];
    if (orderBy && order) sort = [orderBy, order];

    return {
      offset: page,
      limit: pageSize,
      order: [sort]
    };
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
