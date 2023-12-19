const Sequelize = require('sequelize');
const sequelize = require('../DB/database');


const Producto = sequelize.define('Producto', {
   
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DOUBLE
    },
    stock: {
        type: DataTypes.NUMBER
    }
  });
  
  
  try {
    Producto.sync({ force: false })
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
  
  
  module.exports = Producto;
  