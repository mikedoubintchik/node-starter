'use strict';

const index = (req, res) => {
  res.send(200, { active: true });
};

export default index;
