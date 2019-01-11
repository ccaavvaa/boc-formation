import * as boc from '@phoenix/boc';
import * as bocServer from '@phoenix/boc-server';
import { ViewServer } from './view-server';
import { Utils } from './tools/utils';
import { TaskConfigurator } from './task-configurator';

const config = Utils.getConfig();
const tenants = config.tenants ?
    Object.getOwnPropertyNames(config.tenants) : [boc.Server.defaultTenantName];
if (!tenants.length) {
    tenants.push(boc.Server.defaultTenantName);
}

export const settings: bocServer.IHttpBocServerSettings = {
    viewServer: new ViewServer(),
    errorHandlerOptions: config.errorHandlerSettings,
    sessionOptions: config.sessionSettings,
    requestLoggerSettings: config.requestLoggerSettings,
    serviceRouteConfig: Utils.getServiceRouteConfig(),
    defaultPort: 3000,
    handlersBaseDir: Utils.rootFolder,
    searchTasksInterval: 60,
    taskConfigurator: new TaskConfigurator(),
    tenants,
};

export const httpBocServer = new bocServer.HttpBocServer(settings);
