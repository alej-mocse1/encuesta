const Express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const server = Express();


server.use(morgan("dev"));
// server.use(Express.json());

server.use(bodyParser.json({ limit: "50mb" }))
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))


server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

  

  server.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(200).send();
  });



server.use(require("./routes2/index.js"))


module.exports = server