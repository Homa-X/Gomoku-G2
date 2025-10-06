const { ENV, PORT, logger } = require('./config');
const app = require('./server.js');

app.listen(PORT, () => {
    logger.info(`http server listening on port ${PORT}`);
})