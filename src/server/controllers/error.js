'use strict';

const index = (req, res) => {
  res.render('error/index', {
    title: 'Error'
  });
};

export default index;
