require('dotenv').config();
const server = require('./host/server.js');
const chalk = require('chalk');

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(chalk.blue(`\n*** Server Running on ${port} ***\n`));
});