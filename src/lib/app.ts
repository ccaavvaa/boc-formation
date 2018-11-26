import * as bocServer from '@phoenix/boc-server';
import { ViewServer } from './view-server';
import { Utils } from './tools/utils';

const config = Utils.getConfig();

const settings: bocServer.IHttpBocServerSettings = {
    viewServer: new ViewServer(),
    errorHandlerOptions: config.errorHandlerSettings,
    sessionOptions: config.sessionSettings,
    requestLoggerSettings: config.requestLoggerSettings,
    serviceRouteConfig: Utils.getServiceRouteConfig(),
    defaultPort: 3000,
    handlersBaseDir: Utils.rootFolder,
};

export const httpBocServer = new bocServer.HttpBocServer(settings);
