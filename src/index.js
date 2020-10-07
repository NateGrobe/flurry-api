const http = require('http');
const config = require('./utils/config');
const app = require('./app');
const logger = require('./utils/logger');

const server = http.createServer(app);

const PORT = config.PORT || 5235;

server.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
