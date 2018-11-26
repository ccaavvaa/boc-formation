// tslint:disable:max-line-length
import * as boc from '@phoenix/boc';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import * as cookie from 'cookie';
import * as _ from 'lodash';
import { ILogger, NoLogger, Logger } from '@phoenix/logger';
import * as winston from 'winston';
import { ISettings, IConfig, IDataDriverConfigs, IDataDriverOverridesByTenant, IVersion } from '../interfaces';
import { defaultConfig } from '../config/default';
import { IErrorHandlerOptions, ISessionManagerSettings, IRequestLoggerSettings } from '@phoenix/server-commons';

const rootFolder = path.join(__dirname, '..', '..');
const packageFilePath = path.join(rootFolder, 'package.json');
const packageFile = fs.existsSync(packageFilePath) ? packageFilePath : path.join(rootFolder, '..', 'package.json');

export class Utils {

    public static readonly rootFolder: string = rootFolder;
    public static readonly packageFile: string = packageFile;

    public static getOptions(): IConfig {
        if (!Utils.options) {
            let options = defaultConfig;
            const userConfigPath = path.join(rootFolder, 'config.js');
            if (fs.existsSync(userConfigPath)) {
                const userConfig: IConfig = require(userConfigPath);
                options = _.merge(options, userConfig);
            }
            Utils.options = options;
        }
        return Utils.options;
    }
    public static getConfig(): ISettings {
        if (!Utils.config) {
            const logger = Utils.getLogger();
            const options = Utils.getOptions();

            const defaultDataDriverSettings: IDataDriverConfigs = options.defaultDataDriver ?
                _.cloneDeep(options.defaultDataDriver) : {};
            if (defaultDataDriverSettings.Accession && defaultDataDriverSettings.Accession.tenantId) {
                defaultDataDriverSettings.GED = defaultDataDriverSettings.GED || {};
                if (!defaultDataDriverSettings.GED.tenantId) {
                    defaultDataDriverSettings.GED.tenantId =
                        defaultDataDriverSettings.Accession.tenantId;
                }
            }

            const tenants: IDataDriverOverridesByTenant = options.tenants ?
                _.cloneDeep(options.tenants) : {};
            for (const tenantName of Object.getOwnPropertyNames(tenants)) {
                const tenant = tenants[tenantName];
                const accessionTenantId = tenant.Accession && tenant.Accession.tenantId ?
                    tenant.Accession.tenantId : defaultDataDriverSettings.Accession.tenantId;
                if (accessionTenantId) {
                    tenant.GED = tenant.GED || {};
                    if (!tenant.GED.tenantId) {
                        tenant.GED.tenantId = accessionTenantId;
                    }
                }
            }

            const errorHandlerSettings: IErrorHandlerOptions = {
                stackTrace: options.log && (typeof (options.log.stackTrace) === 'boolean') ? options.log.stackTrace : false,
                logger,
            };

            const session = options.session || {};
            const sessionSettings: ISessionManagerSettings = {
                cookieName: session.cookieName || 'Basic',
                clearInterval: session.clearInterval || 3 * 60,
                timeOut: 20 * 60,
                logger,
            };

            const requestLoggerSettings: IRequestLoggerSettings = {
                requestProperties: options.log.requestProperties,
                logger,
            };

            const version: IVersion = options.version || {};
            if (typeof (version.checkVersion) !== 'boolean') {
                version.checkVersion = false;
            }
            version.entityName = version.entityName || 'Person';

            Utils.config = {
                defaultDataDriverSettings,
                tenants,
                errorHandlerSettings,
                requestLoggerSettings,
                sessionSettings,
                version,
            };
        }
        return Utils.config;
    }

    public static getServiceRouteConfig(): any {
        if (Utils.configRoutes) {
            return Utils.configRoutes;
        }
        Utils.configRoutes = (require('../config/routes') || {}).config;
        Utils.configRoutes = Utils.configRoutes || {};
        return Utils.configRoutes;
    }

    public static getLogger(): ILogger {
        if (Utils.logger) {
            return Utils.logger;
        }
        let winstonLogger: winston.Logger;
        const defaultLoggerConfigPath = path.join(__dirname, '../config/');
        for (const folder of [rootFolder, defaultLoggerConfigPath]) {
            const logConfigFileName = path.join(folder, 'logger-conf.js');
            if (fs.existsSync(logConfigFileName)) {
                winstonLogger = require(logConfigFileName);
                break;
            }
        }
        Utils.logger = winstonLogger ? new Logger(winstonLogger) : new NoLogger();
        return Utils.logger;
    }

    public static getVersion(): string {
        const packageInfo = this.getJSONFile(packageFile);
        return packageInfo ? packageInfo.version : '0.0.0';
    }

    public static async genNumBuild(): Promise<any> {
        const packageInfo = this.getJSONFile(packageFile);
        const version: string = packageInfo.version;
        const v: string[] = version.split('.');
        v[2] = this.formatDate();
        const newVersion: string = v.join('.');
        packageInfo.version = newVersion;
        return await fs.writeFile('package.json', JSON.stringify(packageInfo, null, 4), (err) => err);
    }

    public static isBlank(val: any): boolean {
        return (val === undefined || val === null);
    }

    public static getJSONFile(fileName: string): any {
        return JSON.parse(fs.readFileSync(fileName, 'utf8'));
    }

    public static fixNumber(x: number): number {
        return parseFloat(x.toFixed(2));
    }

    public static getContainer(c: boc.Container, idContainer: string): boc.Container {
        const containers = c.sessionServices.getContainers();
        for (const co of containers) {
            if (co.id === idContainer) {
                return co;
            }
        }
        return null;
    }
    public static uuid22(): string {
        const x = uuid();
        const x2: string = x.split('-').join('');
        const buf: Buffer = new Buffer(x2, 'hex');
        const base64: string = buf.toString('base64');
        const uid: string = base64.split('=').join('');
        return uid;
    }

    public static setCookies(headers: any, cookies: any) {
        if (!cookies || typeof cookies !== 'object') {
            return;
        }
        const oldCookies = headers.Cookie ? cookie.parse(headers.Cookie) : {};
        const oldCookieNames = Object.getOwnPropertyNames(oldCookies);
        const newCookieNames = Object.getOwnPropertyNames(cookies);
        const elements: string[] = [];
        for (const oldCookieName of oldCookieNames) {
            if (newCookieNames.indexOf(oldCookieName) < 0) {
                elements.push(`${oldCookieName}=${oldCookies[oldCookieName]}`);
            }
        }
        for (const cookieName of newCookieNames) {
            elements.push(`${cookieName}=${cookies[cookieName]}`);
        }
        if (elements.length) {
            headers.Cookie = elements.join(';');
        } else {
            delete headers.Cookie;
        }
    }
    public static combineUrl(...args: string[]) {
        return args
            .filter((v) => v)
            .map((v) => v.replace(/\/$/, ''))
            .join('/');
    }

    public static round(val: number, arrondi: number): number {
        const x = val / arrondi;
        const y = Math.round(x);
        const z = y * arrondi;
        return z;
    }

    public static isFirstModif(c: boc.Container, constr: string, propName: string): boolean {
        const msgRouter: any = c.messageRouter;
        const stack0: any = msgRouter.stack[0];
        return stack0.message.body.propName === propName && stack0.message.constr.name === constr;
    }

    public static deleteDoublons(arr: any[]): any[] {
        const uniqueArr: any[] = [];
        for (const a of arr) {
            if (uniqueArr.indexOf(a) === -1) {
                uniqueArr.push(a);
            }
        }
        return uniqueArr;
    }

    public static formatId(id: number, length?: number): string {
        const l = length || 8;
        const idStr: string = id.toString(10);
        let result: string = idStr;
        while (result.length < l) {
            result = '0' + result;
        }
        return result;
    }

    public static getExtraInfo(prop: boc.BaseProperty): any {
        const propDeclaration = prop.owner.classInfo.allProperties.find((p) => p.name === prop.propName);
        const extraInfo = propDeclaration && propDeclaration.info.extraInfo;
        return extraInfo;
    }

    private static configRoutes: any;
    private static config: ISettings;
    private static options: IConfig;
    private static logger: ILogger;

    private static formatDate(date?: Date): string {
        const dateNow: Date = date || new Date();
        const y = dateNow.getFullYear();
        const m = ('0' + (dateNow.getMonth() + 1) + '').slice(-2);
        const d = ('0' + dateNow.getDate()).slice(-2);
        return y + '' + m + '' + d;
    }
}