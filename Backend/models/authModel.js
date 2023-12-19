const Sequelize = require('sequelize');
const sequelize = require('../DB/database');


const User = sequelize.define('User', {

  userName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  },

});


try {
  User.sync({ force: false })
    .then(() => {
      console.log('Table created successfully.');
    })
    .catch(err => {
      console.error('Error creating table:', err);
    });
} catch (error) {
  console.error('Error:', error);
}


// MyModel.sync({ force: false })
//   .then(() => {
//     console.log('Table synchronized successfully.');
//   })
//   .catch(err => {
//     console.error('Error synchronizing table:', err);
//   });


module.exports = User;
