if (typeof process.loadEnvFile === 'function') {
    process.loadEnvFile(); // defaults to ./.env
}

const path = require('node:path');
const winston = require('winston');

// ---- ENV / PORT ----
const PORT = Number(process.env.PORT) || 3001;

const ENV_TEXT = String(process.env.NODE_ENV || process.env.ENV || 'development').toLowerCase();
const environments = Object.freeze({
    DEV: 'development',
    TEST: 'test',
    STAGE: 'stage',
    PROD: 'prod',
});
const ENV =
    ENV_TEXT.startsWith('prod')  ? environments.PROD  :
        ENV_TEXT.startsWith('stage') ? environments.STAGE :
            ENV_TEXT.startsWith('test')  ? environments.TEST  :
                environments.DEV;
const isProd = ENV === environments.PROD;

// ---- Logger ----
const LOG_LEVEL = process.env.LOG_LEVEL || (isProd ? 'info' : 'debug');
const LOG_FILE  = process.env.LOG_FILE && path.resolve(process.env.LOG_FILE);

const format = winston.format.combine(
    winston.format.timestamp(),
    isProd ? winston.format.json()
        : winston.format.printf(({ timestamp, level, message, ...meta }) =>
            `${timestamp} [${level}] ${message}${Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : ''}`)
);

const transports = [
    new winston.transports.Console({ level: LOG_LEVEL }),
    ...(LOG_FILE ? [new winston.transports.File({ filename: LOG_FILE, level: LOG_LEVEL })] : [])
];

const logger = winston.createLogger({ level: LOG_LEVEL, format, transports });

module.exports = { PORT, ENV, environments, isProd, logger };
