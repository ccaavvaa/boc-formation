"use strict";
const winston = require("winston");
const path = require("path");
const fs = require("fs");
const logger = require("@phoenix/logger");
const utils = require("./lib/tools/utils");
const logDir = path.join(utils.Utils.rootFolder, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const logFileName = path.join(logDir, 'accession-logs');
const truncateLogFile = false;
if (truncateLogFile && fs.existsSync(logFileName)) {
    fs.truncateSync(logFileName);
}
const stringFormat = logger.stringify();
const transports = [
    new winston.transports.File({
        filename: logFileName,
        level: 'debug',
        maxsize: 1024 * 1024 * 10,
        maxFiles: 5,
        format: stringFormat,
    }),
];
const winstonLogger = winston.createLogger({
    transports,
});
module.exports = winstonLogger;
