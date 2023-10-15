const server = require("./src/server.js");
const { conn }  = require('./src/db.js');

const PORT = process.env.PORT || 3005

server.listen(PORT, "0.0.0.0", async() => {

    try {
       await conn.sync({alter:true}),
      console.log('%s listening ' + PORT ); 
   } catch (error) {
      console.log(error.message)  
   }
  })