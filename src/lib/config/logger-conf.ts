import * as winston from 'winston';
import * as Transport from 'winston-transport';
import * as path from 'path';
import * as fs from 'fs';
import { stringify, LogLevel } from '@phoenix/logger';

import { Utils } from '../tools/utils';
import { IConfig } from '../interfaces';
// tslint:disable:max-line-length

const options: IConfig = Utils.getOptions();
const level: LogLevel | 'none' = options.log && options.log.level ? options.log.level : 'error';
let winstonLogger = null;

if (level !== 'none') {
    let logDir: string =
        options.log && options.log.logDirectory ? options.log.logDirectory : 'logs';
    if (!path.isAbsolute(logDir)) {
        logDir = path.join(Utils.rootFolder, logDir);
    }
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
    const fileName =
        options.log && options.log.logFileName ? options.log.logFileName : 'accession-logs';
    const logFileName = path.join(logDir, fileName);
    const truncateLogFile = false;

    if (truncateLogFile && fs.existsSync(logFileName)) {
        fs.truncateSync(logFileName);
    }

    const stringFormat = stringify();

    const transports: Transport[] = [
        new winston.transports.File({
            filename: logFileName,
            level,
            maxsize: 1024 * 1024 * 10,
            maxFiles: 5,
            format: stringFormat,
        }),
    ];
    winstonLogger = winston.createLogger({
        transports,
    });
}

module.exports = winstonLogger;