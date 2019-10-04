const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const actionRouter = require('../api/actionRouter.js');
const projectRouter = require('../api/projectRouter.js');

const server = express();


server.use(helmet());
server.use(logger);
server.use(express.json());

server.use(cors());

server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
  res.send('<h2>WebAPI Challenge</h2>');
});





function logger(req, res, next){
  const now = new Date().toISOString();
  console.log(`\nMethod: ${req.method}, \nURL: ${req.url}, \n Time: ${now}`);
  next();
}

module.exports = server;