// tslint:disable:max-line-length
import * as winston from 'winston';
import * as Transport from 'winston-transport';
import * as path from 'path';
import * as fs from 'fs';
import { stringify, ILog, filter } from '@phoenix/logger';
import * as _ from 'lodash';
import { Utils } from '../tools/utils';
const rootDir = Utils.rootFolder;
const includeTags: string[] = ['session', 'errorHandler'];
const excludeTags: string[] = [
    'objectStore', 'action', 'setProp', 'messageRouter', 'mdrDataDriver'];
const f = filter({
    filterFunc: (info: ILog): boolean => {
        const result =
            info.tags &&
            _.intersection(includeTags, info.tags).length > 0 &&
            _.intersection(excludeTags, info.tags).length === 0;
        return result;
    },
});

const logDir = path.join(rootDir, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const logFileName = path.join(logDir, 'accession-logs');
const logFileNameD = path.join(logDir, 'debug-logs');
const truncateLogFile = true;

if (truncateLogFile && fs.existsSync(logFileName)) {
    fs.truncateSync(logFileName);
}
if (truncateLogFile && fs.existsSync(logFileNameD)) {
    fs.truncateSync(logFileNameD);
}

const stringFormat = stringify();

const transports: Transport[] = [
    new winston.transports.File({
        filename: logFileName,
        level: 'error',
        maxsize: 1024 * 1024 * 10,
        maxFiles: 5,
        format: stringFormat,
    }),
    new winston.transports.File({
        filename: logFileNameD,
        level: 'debug',
        maxsize: 1024 * 1024 * 10,
        maxFiles: 5,
        format: winston.format.combine(f, stringFormat),
    }),
];
const winstonLogger = winston.createLogger({
    transports,
});
module.exports = winstonLogger;