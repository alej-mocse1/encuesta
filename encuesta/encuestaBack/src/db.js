const { Sequelize } = require('sequelize');
const fs = require("fs");
const path = require("path");
const Users = require('./models/modelUser.js');

require('dotenv').config();

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;


// const sequelize = new Sequelize(`postgres://postgres:cabj1234@localhost/gaseosaspromo`, {
//   logging: false, 
//   native: false, 
// });

const sequelize = new Sequelize(`postgresql://postgres:QbZylT7o50HSjOWvJEsk@containers-us-west-53.railway.app:7127/railway`, {
  logging: false, 
  native: false, 
});


//definimos los modelos
const User = Users(sequelize, Sequelize);


 sequelize.models.User = User;

 



module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Codigos, User } = require('./db.js');
    conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  };