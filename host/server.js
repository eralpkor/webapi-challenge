const express = require('express');
const middleware = require('../middleware/middleware.js');
const helmet = require('helmet');
const cors = require('cors');

const actionRouter = require('../api/actionRouter.js');
const projectRouter = require('../api/projectRouter.js');

const server = express();

server.use(middleware.logger);
server.use(helmet());
server.use(express.json());

server.use(cors());

server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
  res.send('<h2>WebAPI Challenge</h2>');
});



module.exports = server;
