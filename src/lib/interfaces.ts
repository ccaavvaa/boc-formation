import { IDataDriverOptions } from '@phoenix/boc-interfaces';
import {
    IErrorHandlerOptions, ISessionManagerOptions,
    IRequestLoggerSettings, ISessionManagerSettings
} from '@phoenix/server-commons';
import { LogLevel, ILogger } from '@phoenix/logger';

export type DataDriverName = 'Basic';
export class DataDriverNames {
    // tslint:disable-next-line:variable-name
    public static readonly Basic = 'Basic';
    public static readonly all: DataDriverName[] =
        [DataDriverNames.Basic];
}

export interface IDataDriverConfigs {
    [driverName: string]: IDataDriverOptions;
}
export interface IDataDriverOverridesByTenant {
    [tenant: string]: IDataDriverConfigs;
}

export interface ILog {
    stackTrace?: boolean;
    requestProperties?: string[];
    level?: LogLevel | 'none';
    logDirectory?: string;
    logFileName?: string;
}

export interface IVersion {
    checkVersion?: boolean;
    entityName?: string;
}

export interface IConfig {
    defaultDataDriver?: IDataDriverConfigs;
    tenants?: IDataDriverOverridesByTenant;
    session?: ISessionManagerOptions;
    log?: ILog;
    version?: IVersion;
}

// A supprimer
export interface ISettings {
    defaultDataDriverSettings: IDataDriverConfigs;
    tenants: IDataDriverOverridesByTenant;
    errorHandlerSettings: IErrorHandlerOptions;
    sessionSettings: ISessionManagerSettings;
    requestLoggerSettings: IRequestLoggerSettings;
    version: IVersion;
}
