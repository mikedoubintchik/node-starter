'use strict';

const users = [
  {
    id: 1,
    email: 'mike@mike.com'
  },
  {
    id: 2,
    email: 'irene@irene.com'
  }
];

const getUsers = (req, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  let id = req.params.id || 0,
    result = {};

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      result = users[i];
      break;
    }
  }

  res.json(result);
};

export default {
  getUsers: getUsers,
  getUserById: getUserById
};
