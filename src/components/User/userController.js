'use strict';

const User = (sequelize, DataTypes) => {
  return sequelize.define(
    'User',
    { email: DataTypes.STRING },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    }
  );
};

export default User;
