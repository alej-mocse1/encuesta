const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
 
module.exports = (sequelize) => {
  sequelize.define("Users", {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: { 
      type: DataTypes.STRING,
    },
    hijos: {
      type: DataTypes.STRING,
    },
    cantidad: {
      type: DataTypes.STRING,
    },
    edadHijo: {
      type: DataTypes.STRING,
    },
    edadHijo2: {
      type: DataTypes.STRING,
    },
    edadHijo3: {
      type: DataTypes.STRING,
    },
    edadHijo4: {
      type: DataTypes.STRING,
    },
    edadHijo5: {
      type: DataTypes.STRING,
    },
    edadHijo6: {
      type: DataTypes.STRING,
    },
    edadHijo7: {
      type: DataTypes.STRING,
    },
    edadHijo8: {
      type: DataTypes.STRING,
    },
    edadHijo9: {
      type: DataTypes.STRING,
    },
    edadHijo10: {
      type: DataTypes.STRING,
    },
    profesion: {
      type: DataTypes.STRING,
    },




    pregunta1: {
      type: DataTypes.STRING,
    },
    pregunta2: {
      type: DataTypes.STRING,
    },
    pregunta3: {
      type: DataTypes.STRING,
    },
    pregunta4: {
      type: DataTypes.STRING,
    },
    pregunta5: {
      type: DataTypes.STRING,
    },
    pregunta6: {
      type: DataTypes.STRING,
    },
    pregunta7: {
      type: DataTypes.STRING,
    },
    pregunta8: {
      type: DataTypes.STRING,
    },
    pregunta9: {
      type: DataTypes.STRING,
    },
    pregunta10: {
      type: DataTypes.STRING,
    }




  });
};
