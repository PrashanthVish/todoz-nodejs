const chalk = require('chalk');
const app = require('./app');

const port = process.env.PORT || 9999;

app.listen(port, () => {
  console.log(chalk.green(`Server started at port: ${port}`));
});
