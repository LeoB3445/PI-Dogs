const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    height:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validator:{
        min:0
      }
    },
    weight:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validator:{
        min:0
      }
    },
    life_expectancy:{
      type:DataTypes.INTEGER,
      allowNull:true
    }
  });
};
